const CRMSection = () => {
  return (
    <section className="py-20 bg-[#1e1e1e]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Integrated CRM Solution</h2>
            <p className="text-[#a0a0a0] mb-6">
              Our proprietary customer relationship management system connects contractors, painters, and homeowners for seamless project management.
            </p>
            <ul className="space-y-5 mb-8">
              <li className="flex items-start">
                <div className="bg-[#0070f3]/20 rounded-full p-2 mr-4 mt-1">
                  <i className="fas fa-tasks text-[#0070f3]"></i>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Project Tracking</h4>
                  <p className="text-[#a0a0a0] text-sm">Monitor application progress, set milestones, and track completion status</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-[#0070f3]/20 rounded-full p-2 mr-4 mt-1">
                  <i className="fas fa-calendar-alt text-[#0070f3]"></i>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Scheduling</h4>
                  <p className="text-[#a0a0a0] text-sm">Coordinate painter availability and project timelines efficiently</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-[#0070f3]/20 rounded-full p-2 mr-4 mt-1">
                  <i className="fas fa-file-invoice-dollar text-[#0070f3]"></i>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Invoicing & Payments</h4>
                  <p className="text-[#a0a0a0] text-sm">Streamlined payment processing and financial tracking</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-[#0070f3]/20 rounded-full p-2 mr-4 mt-1">
                  <i className="fas fa-chart-line text-[#0070f3]"></i>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Reporting</h4>
                  <p className="text-[#a0a0a0] text-sm">Detailed analytics on project performance and customer satisfaction</p>
                </div>
              </li>
            </ul>
            <a 
              href="#" 
              className="bg-[#0070f3] hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors inline-block"
            >
              Request CRM Demo
            </a>
          </div>
          
          <div className="bg-[#121212] rounded-lg overflow-hidden shadow-xl">
            <div className="border-b border-[#333333] p-4 flex items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#ff4d4d]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ff9900]"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="ml-4 text-sm text-[#a0a0a0]">Praetorian CRM Dashboard</div>
            </div>
            <div className="p-6">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="CRM Dashboard mockup" 
                className="rounded-lg shadow-lg w-full"
              />
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="bg-[#1e1e1e] rounded-lg p-4">
                  <div className="text-sm text-[#a0a0a0] mb-1">Active Projects</div>
                  <div className="text-2xl font-bold">24</div>
                </div>
                <div className="bg-[#1e1e1e] rounded-lg p-4">
                  <div className="text-sm text-[#a0a0a0] mb-1">Pending Quotes</div>
                  <div className="text-2xl font-bold">12</div>
                </div>
                <div className="bg-[#1e1e1e] rounded-lg p-4">
                  <div className="text-sm text-[#a0a0a0] mb-1">Completion Rate</div>
                  <div className="text-2xl font-bold">98%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CRMSection;
