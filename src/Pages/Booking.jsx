import React from 'react';
import { CalcomPopupButton } from '@/Components/Shared/CalcomEmbed';
import { PageHeader } from '@/Components/Shared/PageHeader';
import { Card, CardContent } from '@/Components/ui/Card';
import { Calendar, Clock, Users } from 'lucide-react';

function Booking() {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-slate-200 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <PageHeader
          title="Schedule a Meeting"
          description="Let's discuss your project, ideas, or potential collaboration opportunities."
        />

        <div className="mt-8">
          <Card>
            <CardContent className="text-center py-12">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-emerald-500/20 rounded-full">
                  <Calendar className="w-8 h-8 text-emerald-400" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Chat?
              </h3>

              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                Choose a convenient time for a 30-minute conversation. We'll discuss your project requirements, goals, and how I can help bring your ideas to life.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center gap-3 text-slate-300">
                  <Clock className="w-5 h-5 text-emerald-400" />
                  <span>30 minutes</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Users className="w-5 h-5 text-emerald-400" />
                  <span>One-on-one</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Calendar className="w-5 h-5 text-emerald-400" />
                  <span>Virtual meeting</span>
                </div>
              </div>

              <CalcomPopupButton
                calLink="evanjacobson"
                className="inline-flex items-center px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-emerald-500/25"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Schedule a Call
              </CalcomPopupButton>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Booking;