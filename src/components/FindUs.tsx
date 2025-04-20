
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
                src="/lovable-uploads/86c7d370-4af7-4b10-93cc-5d547d6aeb26.png" 
                alt="Model wearing jewelry" 
                className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="overflow-hidden rounded-lg">
              <img 
                src="/lovable-uploads/a7474309-14f0-4925-a566-78e2c597dcd6.png" 
                alt="Hands with jewelry" 
                className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="overflow-hidden rounded-lg">
              <img 
                src="/lovable-uploads/1153e8d2-910b-4c93-b132-28385408cbd2.png" 
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
