
const FindUs = () => {
  return (
    <section className="py-16 bg-larana-brown-light">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center">
          <div className="lg:col-span-1 mb-8 lg:mb-0">
            <div className="text-larana-beige-light">
              <h2 className="text-5xl font-serif mb-8">Find Us</h2>
              <div className="space-y-4">
                <p className="text-lg">www.laranajewelry.com</p>
                <p className="text-lg">@laranajewelry</p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="overflow-hidden rounded-lg">
              <img 
                src="/image/img1.png" 
                alt="Model wearing jewelry" 
                className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="overflow-hidden rounded-lg">
              <img 
                src="/image/img2.png" 
                alt="Hands with jewelry" 
                className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="overflow-hidden rounded-lg">
              <img 
                src="/image/img3.png" 
                alt="Jewelry collection" 
                className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindUs;
