import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Settings as SettingsIcon, Percent, DollarSign, AlertCircle, User, Lock, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

interface PasswordResetForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface CommissionSettings {
  frontEndRate: number;
  backEndRate: number;
  defaultFlatRate?: number;
  defaultBonusAmount?: number;
}

export function Settings() {
  const { user, updateUserName, updatePassword, updateCommissionRates, deleteAccount } = useAuth();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(user?.name || '');
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [passwordUpdateSuccess, setPasswordUpdateSuccess] = useState(false);
  const [isEditingCommission, setIsEditingCommission] = useState(false);

  const { register: registerPassword, handleSubmit: handlePasswordSubmit, reset: resetPassword, formState: { errors: passwordErrors }, watch } = useForm<PasswordResetForm>();
  
  const { register: registerCommission, handleSubmit: handleCommissionSubmit } = useForm<CommissionSettings>({
    defaultValues: {
      frontEndRate: user?.settings?.commissionRates?.frontEndRate || 25,
      backEndRate: user?.settings?.commissionRates?.backEndRate || 20,
      defaultFlatRate: user?.settings?.commissionRates?.defaultFlatRate,
      defaultBonusAmount: user?.settings?.commissionRates?.defaultBonusAmount
    }
  });

  const handleNameUpdate = async () => {
    try {
      await updateUserName(newName);
      setIsEditingName(false);
      toast.success('Name updated successfully');
    } catch (error) {
      toast.error('Failed to update name');
    }
  };

  const handlePasswordReset = async (data: PasswordResetForm) => {
    if (data.newPassword === data.currentPassword) {
      toast.error('New password must be different from current password');
      return;
    }

    if (data.newPassword !== data.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    try {
      await updatePassword(data.currentPassword, data.newPassword);
      toast.success('Password updated successfully');
      setIsResettingPassword(false);
      setPasswordUpdateSuccess(true);
      resetPassword();
      
      setTimeout(() => {
        setPasswordUpdateSuccess(false);
      }, 3000);
    } catch (error) {
      toast.error('Failed to update password. Please check your current password.');
    }
  };

  const handleCommissionUpdate = async (data: CommissionSettings) => {
    try {
      await updateCommissionRates(data);
      setIsEditingCommission(false);
      toast.success('Commission rates updated successfully');
    } catch (error) {
      toast.error('Failed to update commission rates');
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await deleteAccount();
        toast.success('Account deleted successfully');
      } catch (error) {
        toast.error('Failed to delete account');
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Personal Information */}
      <div className="bg-white dark:bg-earth-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center mb-6">
            <User className="h-6 w-6 text-primary-600 mr-3" />
            <h3 className="text-lg font-medium text-earth-900 dark:text-earth-100">
              Personal Information
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
                Display Name
              </label>
              {isEditingName ? (
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
                  />
                  <button
                    onClick={handleNameUpdate}
                    className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsEditingName(false);
                      setNewName(user?.name || '');
                    }}
                    className="ml-3 inline-flex items-center px-4 py-2 border border-earth-300 text-sm font-medium rounded-md text-earth-700 bg-white hover:bg-earth-50"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="mt-1 flex justify-between items-center">
                  <span className="text-earth-900 dark:text-earth-100">
                    {user?.name}
                  </span>
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="text-primary-600 hover:text-primary-700 text-sm"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  value={user?.email}
                  disabled
                  className="block w-full px-3 py-2 rounded-md border-earth-300 bg-earth-100 dark:bg-earth-700 dark:border-earth-600 dark:text-earth-100 cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Commission Settings */}
      <div className="bg-white dark:bg-earth-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center mb-6">
            <Percent className="h-6 w-6 text-primary-600 mr-3" />
            <h3 className="text-lg font-medium text-earth-900 dark:text-earth-100">
              Commission Settings
            </h3>
          </div>

          {isEditingCommission ? (
            <form onSubmit={handleCommissionSubmit(handleCommissionUpdate)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
                    Front End Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    {...registerCommission('frontEndRate')}
                    className="mt-1 block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
                    Back End Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    {...registerCommission('backEndRate')}
                    className="mt-1 block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
                    Default Flat Rate
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...registerCommission('defaultFlatRate')}
                    className="mt-1 block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
                    Default Bonus Amount
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...registerCommission('defaultBonusAmount')}
                    className="mt-1 block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditingCommission(false)}
                  className="px-4 py-2 text-earth-600 dark:text-earth-400 hover:text-earth-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
                    Front End Rate
                  </label>
                  <p className="mt-1 text-earth-900 dark:text-earth-100">
                    {user?.settings?.commissionRates?.frontEndRate || 25}%
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
                    Back End Rate
                  </label>
                  <p className="mt-1 text-earth-900 dark:text-earth-100">
                    {user?.settings?.commissionRates?.backEndRate || 20}%
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
                    Default Flat Rate
                  </label>
                  <p className="mt-1 text-earth-900 dark:text-earth-100">
                    ${user?.settings?.commissionRates?.defaultFlatRate?.toLocaleString() || 'Not set'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
                    Default Bonus Amount
                  </label>
                  <p className="mt-1 text-earth-900 dark:text-earth-100">
                    ${user?.settings?.commissionRates?.defaultBonusAmount?.toLocaleString() || 'Not set'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsEditingCommission(true)}
                className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                Edit Commission Rates
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Password Reset */}
      <div className="bg-white dark:bg-earth-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center mb-6">
            <Lock className="h-6 w-6 text-primary-600 mr-3" />
            <h3 className="text-lg font-medium text-earth-900 dark:text-earth-100">
              Password Settings
            </h3>
          </div>

          {isResettingPassword ? (
            <form onSubmit={handlePasswordSubmit(handlePasswordReset)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
                  Current Password
                </label>
                <input
                  type="password"
                  {...registerPassword('currentPassword', { required: 'Current password is required' })}
                  className="mt-1 block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
                />
                {passwordErrors.currentPassword && (
                  <p className="mt-1 text-sm text-red-600">{passwordErrors.currentPassword.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
                  New Password
                </label>
                <input
                  type="password"
                  {...registerPassword('newPassword', { 
                    required: 'New password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters'
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
                />
                {passwordErrors.newPassword && (
                  <p className="mt-1 text-sm text-red-600">{passwordErrors.newPassword.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  {...registerPassword('confirmPassword', {
                    required: 'Please confirm your new password',
                    validate: value => value === watch('newPassword') || 'Passwords do not match'
                  })}
                  className="mt-1 block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
                />
                {passwordErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{passwordErrors.confirmPassword.message}</p>
                )}
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsResettingPassword(false);
                    resetPassword();
                  }}
                  className="px-4 py-2 text-sm font-medium text-earth-700 dark:text-earth-300 hover:text-earth-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700"
                >
                  Update Password
                </button>
              </div>
            </form>
          ) : (
            <div className="flex justify-between items-center">
              <p className="text-sm text-earth-500 dark:text-earth-400">
                Change your password to keep your account secure
              </p>
              <button
                onClick={() => setIsResettingPassword(true)}
                className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700"
              >
                Reset Password
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Account Deletion */}
      <div className="bg-white dark:bg-earth-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Trash2 className="h-6 w-6 text-red-500 mr-3" />
              <h3 className="text-lg font-medium text-earth-900 dark:text-earth-100">
                Delete Account
              </h3>
            </div>
            <button
              onClick={handleDeleteAccount}
              className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
            >
              Delete Account
            </button>
          </div>
          <p className="mt-2 text-sm text-earth-500 dark:text-earth-400">
            Once you delete your account, there is no going back. Please be certain.
          </p>
        </div>
      </div>
    </div>
  );
}