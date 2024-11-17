// Fix referral form submission
const handleSubmit = async (data: Referral) => {
  try {
    const referralData = {
      ...data,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      status: 'pending' as const
    };

    const db = await getDB();
    const tx = db.transaction(['referrals', 'referrers'], 'readwrite');

    // Add referral
    await tx.objectStore('referrals').add(referralData);

    // Update referrer stats
    const referrerStore = tx.objectStore('referrers');
    const referrer = await referrerStore.get(data.referrerId);
    if (referrer) {
      await referrerStore.put({
        ...referrer,
        referralCount: (referrer.referralCount || 0) + 1,
        lastReferralDate: new Date().toISOString()
      });
    }

    await tx.done;
    toast.success('Referral added successfully');
    onSubmit(referralData);
    onClose();
  } catch (error) {
    console.error('Error adding referral:', error);
    toast.error('Failed to add referral');
  }
};