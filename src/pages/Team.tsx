
import { teamData } from "@/data/team";

const TeamPage = () => {
  return (
    <div className="bg-larana-beige-light py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-serif text-larana-brown-dark mb-4 text-center">
          Our Team
        </h1>
        <p className="text-center max-w-3xl mx-auto text-larana-brown mb-16">
          Meet the talented individuals behind Larana Jewelry. Our diverse team brings together expertise in design, craftsmanship, and business to create exceptional jewelry pieces.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {teamData.map((member, index) => (
            <div 
              key={member.id} 
              className={`flex flex-col md:flex-row items-center md:items-start gap-8 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="w-full md:w-2/5">
                <div className="aspect-square rounded-full overflow-hidden shadow-lg">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="w-full md:w-3/5 text-center md:text-left">
                <h2 className="font-serif text-2xl text-larana-brown-dark">{member.name}</h2>
                <p className="text-larana-brown font-medium mt-1 mb-4">{member.position}</p>
                <p className="text-larana-brown-dark/80">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
