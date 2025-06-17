import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [showTop, setShowTop] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);

  const sections = ['home','about','projects','skills','contact'];

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setShowTop(y > 300);
      let current = 'home';
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && y >= el.offsetTop - 200) current = id;
      });
      setActive(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    async function fetchGithub() {
      try {
        const userRes = await fetch('https://api.github.com/users/Nico3246');
        if (userRes.ok) {
          const data = await userRes.json();
          setUser(data);
        }
        const repoRes = await fetch('https://api.github.com/users/Nico3246/repos?sort=updated&per_page=6');
        if (repoRes.ok) {
          const data = await repoRes.json();
          setRepos(data);
        }
      } catch (err) {
        console.error('GitHub fetch failed', err);
      }
    }
    fetchGithub();
  }, []);

  const toggleTheme = () => setDarkMode(!darkMode);
  const toggleMenu = () => setMobileOpen(!mobileOpen);

  const handleSubmit = e => {
    e.preventDefault();
    setFormSuccess(true);
    e.target.reset();
    setTimeout(() => setFormSuccess(false), 5000);
  };

  return (
    <div className={`font-sans antialiased text-gray-800 bg-gray-50 ${darkMode ? 'dark-mode' : ''}`}> 
      <header id="navbar" className="fixed w-full bg-white shadow-sm z-50 transition-all duration-300">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-primary">NS<span className="text-dark">.</span></a>
          <button onClick={toggleMenu} className="md:hidden focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
          <nav className="hidden md:flex space-x-8">
            {sections.map(id => (
              <a key={id} href={`#${id}`} className={`nav-link font-medium ${active===id?'active':''}`}>{id.charAt(0).toUpperCase()+id.slice(1)}</a>
            ))}
          </nav>
          <button onClick={toggleTheme} className="ml-4 p-2 rounded-full hover:bg-gray-100 focus:outline-none theme-toggle">
            {darkMode ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
            )}
          </button>
        </div>
        {mobileOpen && (
          <nav className="px-4 py-3 bg-white md:hidden border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              {sections.map(id => (
                <a key={id} href={`#${id}`} onClick={()=>setMobileOpen(false)} className="mobile-link py-2 font-medium">{id.charAt(0).toUpperCase()+id.slice(1)}</a>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Hola, soy <span className="text-primary">{user?.name || 'Nicolás Sánchez'}</span></h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8">{user?.bio || 'Desarrollador de Software'}</p>
              <div className="flex flex-wrap gap-4">
                <a href="#projects" className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-secondary transition-colors duration-300 shadow-md">Ver proyectos</a>
                <a href="#contact" className="px-6 py-3 bg-white text-primary font-medium rounded-lg border border-primary hover:bg-gray-50 transition-colors duration-300">Contactar</a>
              </div>
              <div className="flex mt-8 space-x-4">
                <a href="https://github.com/Nico3246" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                  <FaGithub className="text-2xl" />
                </a>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                  <FaLinkedinIn className="text-2xl" />
                </a>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                  <FaTwitter className="text-2xl" />
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center mt-4 md:mt-0">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-primary bg-opacity-10 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                  {user?.avatar_url ? (
                    <img src={user.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-40 h-40 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                    </svg>
                  )}
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-4 shadow-lg">
                  <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="relative">
                <div className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden">
                  <svg className="w-full h-full text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-primary text-white rounded-lg p-4 shadow-lg">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <span className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </span>
                Sobre mí
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">Soy un desarrollador de software apasionado por crear soluciones tecnológicas innovadoras. Me especializo en desarrollo web con React y JavaScript, siempre buscando aprender nuevas tecnologías y mejorar mis habilidades.</p>
              <p className="text-gray-600 mb-8 leading-relaxed">Mi enfoque se centra en escribir código limpio y mantenible, con especial atención al rendimiento y la experiencia del usuario. Disfruto trabajando en equipo y colaborando en proyectos desafiantes que me permitan crecer profesionalmente.</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-primary font-bold text-xl mb-1">2+</div>
                  <div className="text-gray-600">Años de experiencia</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-primary font-bold text-xl mb-1">10+</div>
                  <div className="text-gray-600">Proyectos completados</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center">Mis Proyectos</h2>
          <p className="text-gray-600 mb-12 text-center max-w-2xl mx-auto">Una selección de mis trabajos más recientes y destacados</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repos.map(repo => (
              <div key={repo.id} className="project-card bg-white rounded-xl overflow-hidden shadow-md">
                <div className="h-48 bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center">
                  <FaGithub className="w-16 h-16 text-white" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-xl">{repo.name}</h3>
                    {repo.language && (
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">{repo.language}</span>
                    )}
                  </div>
                  {repo.description && <p className="text-gray-600 mb-4">{repo.description}</p>}
                  <div className="flex justify-between">
                    <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-primary hover:text-secondary font-medium flex items-center">
                      <span>Ver repo</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="https://github.com/Nico3246" target="_blank" rel="noreferrer" className="inline-flex items-center px-6 py-3 bg-white text-primary font-medium rounded-lg border border-primary hover:bg-gray-50 transition-colors duration-300">
              <FaGithub className="mr-2" />
              Ver más proyectos en GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Skills Section - simplified content */}
      <section id="skills" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center">Mis Habilidades</h2>
          <p className="text-gray-600 mb-12 text-center max-w-2xl mx-auto">Tecnologías y herramientas con las que trabajo</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-bold mb-6">Frontend</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1"><span className="font-medium">React</span><span>90%</span></div>
                  <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full" style={{width:'90%'}}></div></div>
                </div>
                <div>
                  <div className="flex justify-between mb-1"><span className="font-medium">JavaScript</span><span>85%</span></div>
                  <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full" style={{width:'85%'}}></div></div>
                </div>
                <div>
                  <div className="flex justify-between mb-1"><span className="font-medium">HTML/CSS</span><span>95%</span></div>
                  <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full" style={{width:'95%'}}></div></div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-bold mb-6">Backend</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1"><span className="font-medium">Node.js</span><span>75%</span></div>
                  <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{width:'75%'}}></div></div>
                </div>
                <div>
                  <div className="flex justify-between mb-1"><span className="font-medium">Express</span><span>80%</span></div>
                  <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{width:'80%'}}></div></div>
                </div>
                <div>
                  <div className="flex justify-between mb-1"><span className="font-medium">MongoDB</span><span>70%</span></div>
                  <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{width:'70%'}}></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center">Contacto</h2>
          <p className="text-gray-600 mb-12 text-center max-w-2xl mx-auto">¿Interesado en trabajar juntos? Ponte en contacto conmigo</p>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2 bg-white rounded-xl shadow-sm p-8">
              <h3 className="text-xl font-bold mb-6">Envíame un mensaje</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input id="name" name="name" type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Tu nombre" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input id="email" name="email" type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="tu@email.com" required />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Asunto</label>
                  <input id="subject" name="subject" type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Asunto del mensaje" required />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                  <textarea id="message" name="message" rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Tu mensaje" required></textarea>
                </div>
                <div>
                  <button type="submit" className="w-full px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-secondary transition-colors duration-300 shadow-md">Enviar mensaje</button>
                </div>
              </form>
              {formSuccess && (
                <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">¡Gracias por tu mensaje! Te responderé lo antes posible.</div>
              )}
            </div>
            <div className="md:w-1/2 space-y-8">
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h3 className="text-xl font-bold mb-6">Información de contacto</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-full p-3 mr-4">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <a href="mailto:nicobs3436@gmail.com" className="text-primary hover:underline">nicobs3436@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-full p-3 mr-4">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Teléfono</h4>
                      <a href="tel:+123456789" className="text-primary hover:underline">+34 </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-full p-3 mr-4">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Ubicación</h4>
                      <p className="text-gray-600">Huelva, España</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h3 className="text-xl font-bold mb-6">Sígueme</h3>
                <div className="flex space-x-4">
                  <a href="https://github.com/Nico3246" target="_blank" rel="noreferrer" className="bg-gray-800 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"><FaGithub /></a>
                  <a href="#" className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"><FaLinkedinIn /></a>
                  <a href="#" className="bg-blue-400 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"><FaTwitter /></a>
                  <a href="#" className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"><FaYoutube /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-dark text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <a href="#" className="text-2xl font-bold">NS<span className="text-primary">.</span></a>
            </div>
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p>&copy; 2023 Nicolás Sánchez. Todos los derechos reservados.</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition-colors"><FaGithub /></a>
              <a href="#" className="hover:text-primary transition-colors"><FaLinkedinIn /></a>
              <a href="#" className="hover:text-primary transition-colors"><FaTwitter /></a>
            </div>
          </div>
        </div>
      </footer>

      {showTop && (
        <a href="#" onClick={e=>{e.preventDefault();window.scrollTo({top:0,behavior:'smooth'});}} className="fixed bottom-6 right-6 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
          </svg>
        </a>
      )}
    </div>
  );
}
