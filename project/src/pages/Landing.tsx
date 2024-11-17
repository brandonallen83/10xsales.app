import React from 'react';
import { Link } from 'react-router-dom';
import { Car, TrendingUp, Users, Target, ChevronRight, Star, Award, Shield, BarChart } from 'lucide-react';

export function Landing() {
  return (
    <div className="bg-earth-50 dark:bg-earth-900 min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-earth-900 dark:text-earth-100 sm:text-5xl md:text-6xl">
                  <span className="block">Transform your</span>
                  <span className="block text-primary-600 dark:text-primary-500">automotive sales career</span>
                </h1>
                <p className="mt-3 text-base text-earth-600 dark:text-earth-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Track your sales, set goals, and boost your performance with AI-powered insights. Join successful automotive sales professionals today.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/register"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
                    >
                      Get Started
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/login"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 dark:bg-primary-900/20 dark:text-primary-300 dark:hover:bg-primary-900/30 md:py-4 md:text-lg md:px-10"
                    >
                      Sign In
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Social Proof Stats */}
      <div className="bg-white dark:bg-earth-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 lg:gap-8">
            <div className="p-6 bg-earth-50 dark:bg-earth-900/50 rounded-lg text-center">
              <BarChart className="h-8 w-8 mx-auto mb-4 text-primary-600" />
              <div className="text-3xl font-bold text-earth-900 dark:text-earth-100">27%</div>
              <div className="text-sm text-earth-600 dark:text-earth-300">Average Income Increase</div>
            </div>
            <div className="p-6 bg-earth-50 dark:bg-earth-900/50 rounded-lg text-center">
              <Car className="h-8 w-8 mx-auto mb-4 text-primary-600" />
              <div className="text-3xl font-bold text-earth-900 dark:text-earth-100">32%</div>
              <div className="text-sm text-earth-600 dark:text-earth-300">Higher F&I Penetration</div>
            </div>
            <div className="p-6 bg-earth-50 dark:bg-earth-900/50 rounded-lg text-center">
              <Users className="h-8 w-8 mx-auto mb-4 text-primary-600" />
              <div className="text-3xl font-bold text-earth-900 dark:text-earth-100">3x</div>
              <div className="text-sm text-earth-600 dark:text-earth-300">More Referrals</div>
            </div>
            <div className="p-6 bg-earth-50 dark:bg-earth-900/50 rounded-lg text-center">
              <Award className="h-8 w-8 mx-auto mb-4 text-primary-600" />
              <div className="text-3xl font-bold text-earth-900 dark:text-earth-100">14 Days</div>
              <div className="text-sm text-earth-600 dark:text-earth-300">Money-Back Guarantee</div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="py-12 bg-white dark:bg-earth-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <Shield className="h-12 w-12 mx-auto mb-4 text-primary-600" />
              <h3 className="text-lg font-medium text-earth-900 dark:text-earth-100">Bank-Level Security</h3>
              <p className="mt-2 text-sm text-earth-500 dark:text-earth-400">Your data is encrypted and secure</p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-primary-600" />
              <h3 className="text-lg font-medium text-earth-900 dark:text-earth-100">CCPA Compliant</h3>
              <p className="mt-2 text-sm text-earth-500 dark:text-earth-400">Privacy first approach</p>
            </div>
            <div className="text-center">
              <Award className="h-12 w-12 mx-auto mb-4 text-primary-600" />
              <h3 className="text-lg font-medium text-earth-900 dark:text-earth-100">Proven Results</h3>
              <p className="mt-2 text-sm text-earth-500 dark:text-earth-400">Data-driven success metrics</p>
            </div>
            <div className="text-center">
              <Target className="h-12 w-12 mx-auto mb-4 text-primary-600" />
              <h3 className="text-lg font-medium text-earth-900 dark:text-earth-100">99.9% Uptime</h3>
              <p className="mt-2 text-sm text-earth-500 dark:text-earth-400">Always available when you need it</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white dark:bg-earth-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 dark:text-primary-400 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-earth-900 dark:text-earth-100 sm:text-4xl">
              Everything you need to succeed
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                  <Target className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-earth-900 dark:text-earth-100">Goal Setting & Tracking</p>
                <p className="mt-2 ml-16 text-base text-earth-500 dark:text-earth-400">
                  Set and track your sales goals with our intuitive dashboard. Monitor your progress in real-time.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-earth-900 dark:text-earth-100">Performance Analytics</p>
                <p className="mt-2 ml-16 text-base text-earth-500 dark:text-earth-400">
                  Get detailed insights into your sales performance with advanced analytics and reporting.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                  <Car className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-earth-900 dark:text-earth-100">Deal Management</p>
                <p className="mt-2 ml-16 text-base text-earth-500 dark:text-earth-400">
                  Track every aspect of your deals, from initial contact to final sale and follow-up.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                  <Users className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-earth-900 dark:text-earth-100">Customer Management</p>
                <p className="mt-2 ml-16 text-base text-earth-500 dark:text-earth-400">
                  Build and maintain your customer relationships with our integrated CRM features.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-50 dark:bg-primary-900/20">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-earth-900 dark:text-earth-100 sm:text-4xl">
            <span className="block">Ready to boost your sales?</span>
            <span className="block text-primary-600 dark:text-primary-400">Start your 14-day free trial today!</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Get Started
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}