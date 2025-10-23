import { Button } from '@/components/ui/button';
import { Briefcase, Users, TrendingUp, Heart } from 'lucide-react';

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero-like Careers Banner */}
      <section className="relative h-[75vh] md:h-[80vh] bg-black overflow-hidden flex items-center justify-center">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />

        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3183171/pexels-photo-3183171.jpeg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Text Content */}
        <div className="relative z-20 text-center px-6 sm:px-8 lg:px-12">
          <h1 className="text-5xl md:text-6xl font-serif text-white mb-6">
            Join Our Team
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light tracking-wide">
            Be part of a growing brand redefining affordable fashion in Pakistan.  
            <span className="block mt-2">
              We’re always looking for passionate individuals to join the H&S family.
            </span>
          </p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Why Work With Us?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              H&S Apparel offers more than just a job—it's an opportunity to grow with a dynamic,
              customer-focused brand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-black">Growth Opportunities</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Advance your career with a rapidly expanding company that values internal promotions.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-black">Collaborative Culture</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Work alongside a supportive team that values your input and ideas.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white">
                <Briefcase className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-black">Competitive Benefits</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Enjoy competitive salaries, employee discounts, and performance incentives.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-black">Work-Life Balance</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We believe in maintaining a healthy balance between professional and personal life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Open Positions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're looking for talented individuals across various departments.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { title: 'Sales Associate', location: 'Multiple Locations in Karachi', type: 'Full-time' },
              { title: 'Store Manager', location: 'Karachi', type: 'Full-time' },
              { title: 'Visual Merchandiser', location: 'Karachi', type: 'Full-time' },
              { title: 'Customer Service Representative', location: 'Karachi', type: 'Full-time' },
            ].map((position, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-semibold text-black mb-2">{position.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span>{position.location}</span>
                      <span>•</span>
                      <span>{position.type}</span>
                    </div>
                  </div>
                  <Button asChild>
                    <a href={`mailto:career@hnsapparel.com?subject=Application for ${position.title}`}>
                      Apply Now
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* General Application CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Don't See a Position That Fits?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              We're always on the lookout for exceptional talent. Send us your CV and tell us
              why you'd be a great addition to the H&S Apparel team.
            </p>
            <Button size="lg" asChild>
              <a href="mailto:career@hnsapparel.com?subject=General Application">
                Send Your CV
              </a>
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              Email:{' '}
              <a href="mailto:career@hnsapparel.com" className="hover:text-black">
                career@hnsapparel.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-black text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Start Your Journey?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Join a team that's passionate about fashion, committed to excellence, and dedicated
            to creating value for our customers.
          </p>
        </div>
      </section>
    </div>
  );
}
