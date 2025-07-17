import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          // Navigation
          nav: {
            festivals: "Festivals",
            destinations: "Destinations", 
            lockers: "GrooveNomad x LockerZ",
            playlist_matcher: "Playlist Matcher"
          },
          // Hero section
          hero: {
            title: "Your Festival Adventure Starts Here",
            subtitle: "Find the perfect festival experience tailored to your preferences",
            search_placeholder: "Ask AI: 'Find me electronic festivals in Europe this summer'",
            thinking: "Thinking...",
            ask_ai: "Ask AI"
          },
          // Quick actions
          quick_actions: {
            find_destinations: "Find Destinations",
            find_destinations_desc: "Discover festival hotspots around the world",
            discover_artists: "Discover Artists", 
            discover_artists_desc: "Explore new music and favorite performers"
          },
          // AI Response
          ai_response: {
            title: "AI Recommendations"
          },
          // Actions
          action: {
            get_quote: "Get Quote",
            personalized: "Get personalized festival recommendations",
            quick_book: "Quick Book"
          },
          // Client Experiences
          client_experiences: {
            title: "Real Festival Experiences",
            subtitle: "Read authentic reviews and stories from festival-goers who found their perfect adventure through Groove Nomad.",
            cta: "Join thousands of music lovers who've discovered their perfect festival experience through our AI-powered recommendations. Your adventure awaits!"
          },
          // Festival Examples
          festival_examples: {
            title: "Featured Festival Adventures", 
            loading: "Loading amazing festival experiences..."
          },
          // Features
          features: {
            title: "Powered by",
            ai_intelligence: "AI Intelligence",
            subtitle: "Our AI assistant helps you discover the perfect festival experience based on your preferences, location, and musical tastes.",
            smart_recommendations: "Smart Recommendations",
            smart_recommendations_desc: "Get personalized festival suggestions based on your music taste, budget, and travel preferences.",
            global_coverage: "Global Coverage",
            global_coverage_desc: "Discover festivals from around the world with detailed location information and travel tips.",
            music_discovery: "Music Discovery",
            music_discovery_desc: "Find new artists and genres while exploring festivals that match your musical journey."
          },
          // Footer
          footer: {
            subtitle: "Discover your next festival adventure with AI-powered recommendations",
            discord: "Join our Discord community"
          },
          // Form
          form: {
            title: "Get Your Personalized Quote",
            description: "Tell us about your festival preferences and we'll create a custom experience just for you.",
            contact: {
              title: "Contact Information",
              full_name: "Full Name",
              full_name_placeholder: "John Doe",
              email: "Email Address", 
              email_placeholder: "john@example.com",
              phone: "Phone Number",
              phone_placeholder: "+1 (555) 123-4567"
            },
            trip: {
              title: "Trip Details",
              budget: "Budget Range (EUR)",
              budget_placeholder: "Select your budget",
              travelers: "Number of Travelers",
              travelers_placeholder: "How many people?",
              dates: "Preferred Travel Dates",
              dates_placeholder: "e.g., July 2024, Summer 2024",
              duration: "Trip Duration",
              duration_placeholder: "How long?"
            },
            preferences: {
              music_title: "Music Preferences"
            },
            accommodation: {
              title: "Accommodation & Transport",
              preference: "Accommodation Preference",
              preference_placeholder: "Select accommodation type",
              transport: "Transport Needs",
              transport_placeholder: "Transport preferences"
            },
            special: {
              title: "Special Requirements"
            },
            submit: "Get My Personalized Quote"
          },
          // Payment
          payment: {
            complete_booking: "Complete Your Booking",
            secure_spot: "Secure your spot at {{festival}}",
            capacity: "{{count}} capacity",
            email: "Email",
            email_placeholder: "your@email.com",
            card_number: "Card Number",
            card_number_placeholder: "1234 5678 9012 3456",
            expiry: "Expiry",
            expiry_placeholder: "MM/YY",
            cvc: "CVC",
            cvc_placeholder: "123",
            total: "Total",
            processing: "Processing...",
            pay_amount: "Pay €{{amount}}",
            success_title: "Payment Successful! 🎉",
            success_description: "Your festival tickets have been confirmed. Check your email for details.",
            success_message: "Your tickets for {{festival}} have been confirmed.",
            confirmation_sent: "Confirmation email sent",
            digital_tickets: "Digital tickets available in app",
            get_ready: "Get ready for an amazing experience!",
            done: "Done"
          },
          // Playlist Matcher  
          playlist_matcher: {
            title: "Festival Playlist Matcher",
            subtitle: "Find festivals that match your music taste based on your playlist"
          },
          // Lockers
          lockers: {
            title: "GrooveNomad x LockerZ",
            subtitle: "Secure storage solutions for festival-goers. Travel light, party hard.",
            features: {
              secure_storage: "Secure Storage",
              secure_storage_desc: "State-of-the-art lockers with electronic locks and 24/7 security monitoring.",
              convenient_locations: "Convenient Locations",
              convenient_locations_desc: "Located at major festival entrances and transportation hubs.",
              flexible_hours: "Flexible Hours",
              flexible_hours_desc: "Available throughout the entire festival duration with 24/7 access."
            },
            pricing: {
              title: "Simple,",
              transparent: "Transparent Pricing"
            },
            locations: {
              title: "Find a",
              lockerz: "LockerZ",
              near_you: "Near You",
              description: "Strategically placed at major festival venues and transport hubs across Europe.",
              view_locations: "View Locations"
            }
          },
          // Common
          common: {
            cancel: "Cancel",
            back_to_home: "Back to Home"
          }
        }
      },
      fr: {
        translation: {
          // Navigation
          nav: {
            festivals: "Festivals",
            destinations: "Destinations", 
            lockers: "GrooveNomad x LockerZ",
            playlist_matcher: "Playlist Matcher"
          },
          // Hero section
          hero: {
            title: "Votre Aventure Festival Commence Ici",
            subtitle: "Trouvez l'expérience festival parfaite adaptée à vos préférences",
            search_placeholder: "Demandez à l'IA : 'Trouvez-moi des festivals électroniques en Europe cet été'",
            thinking: "Réflexion...",
            ask_ai: "Demander à l'IA"
          },
          // Quick actions
          quick_actions: {
            find_destinations: "Trouver des Destinations",
            find_destinations_desc: "Découvrez les hotspots de festivals dans le monde",
            discover_artists: "Découvrir des Artistes", 
            discover_artists_desc: "Explorez de nouveaux artistes et vos performers favoris"
          },
          // AI Response
          ai_response: {
            title: "Recommandations IA"
          },
          // Actions
          action: {
            get_quote: "Obtenir un Devis",
            personalized: "Obtenez des recommandations personnalisées de festivals",
            quick_book: "Réservation Rapide"
          },
          // Client Experiences
          client_experiences: {
            title: "Expériences Festival Réelles",
            subtitle: "Lisez des avis authentiques et des histoires de festivaliers qui ont trouvé leur aventure parfaite grâce à Groove Nomad.",
            cta: "Rejoignez des milliers d'amateurs de musique qui ont découvert leur expérience festival parfaite grâce à nos recommandations IA. Votre aventure vous attend !"
          },
          // Festival Examples
          festival_examples: {
            title: "Aventures Festival en Vedette", 
            loading: "Chargement d'expériences festival incroyables..."
          },
          // Features
          features: {
            title: "Alimenté par",
            ai_intelligence: "l'Intelligence Artificielle",
            subtitle: "Notre assistant IA vous aide à découvrir l'expérience festival parfaite basée sur vos préférences, localisation et goûts musicaux.",
            smart_recommendations: "Recommandations Intelligentes",
            smart_recommendations_desc: "Obtenez des suggestions personnalisées basées sur vos goûts musicaux, budget et préférences de voyage.",
            global_coverage: "Couverture Mondiale",
            global_coverage_desc: "Découvrez des festivals du monde entier avec des informations détaillées et conseils de voyage.",
            music_discovery: "Découverte Musicale",
            music_discovery_desc: "Trouvez de nouveaux artistes et genres en explorant des festivals qui correspondent à votre parcours musical."
          },
          // Footer
          footer: {
            subtitle: "Découvrez votre prochaine aventure festival avec des recommandations IA",
            discord: "Rejoignez notre communauté Discord"
          },
          // Form
          form: {
            title: "Obtenez Votre Devis Personnalisé",
            description: "Parlez-nous de vos préférences festival et nous créerons une expérience sur mesure pour vous.",
            contact: {
              title: "Informations de Contact",
              full_name: "Nom Complet",
              full_name_placeholder: "Jean Dupont",
              email: "Adresse Email", 
              email_placeholder: "jean@example.com",
              phone: "Numéro de Téléphone",
              phone_placeholder: "+33 6 12 34 56 78"
            },
            trip: {
              title: "Détails du Voyage",
              budget: "Fourchette de Budget (EUR)",
              budget_placeholder: "Sélectionnez votre budget",
              travelers: "Nombre de Voyageurs",
              travelers_placeholder: "Combien de personnes ?",
              dates: "Dates de Voyage Préférées",
              dates_placeholder: "ex: Juillet 2024, Été 2024",
              duration: "Durée du Voyage",
              duration_placeholder: "Combien de temps ?"
            },
            preferences: {
              music_title: "Préférences Musicales"
            },
            accommodation: {
              title: "Hébergement et Transport",
              preference: "Préférence d'Hébergement",
              preference_placeholder: "Sélectionnez le type d'hébergement",
              transport: "Besoins en Transport",
              transport_placeholder: "Préférences de transport"
            },
            special: {
              title: "Exigences Spéciales"
            },
            submit: "Obtenir Mon Devis Personnalisé"
          },
          // Payment
          payment: {
            complete_booking: "Finaliser Votre Réservation",
            secure_spot: "Sécurisez votre place au {{festival}}",
            capacity: "{{count}} de capacité",
            email: "Email",
            email_placeholder: "votre@email.com",
            card_number: "Numéro de Carte",
            card_number_placeholder: "1234 5678 9012 3456",
            expiry: "Expiration",
            expiry_placeholder: "MM/AA",
            cvc: "CVC",
            cvc_placeholder: "123",
            total: "Total",
            processing: "Traitement...",
            pay_amount: "Payer {{amount}}€",
            success_title: "Paiement Réussi ! 🎉",
            success_description: "Vos billets de festival ont été confirmés. Vérifiez votre email pour les détails.",
            success_message: "Vos billets pour {{festival}} ont été confirmés.",
            confirmation_sent: "Email de confirmation envoyé",
            digital_tickets: "Billets numériques disponibles dans l'app",
            get_ready: "Préparez-vous pour une expérience incroyable !",
            done: "Terminé"
          },
          // Playlist Matcher  
          playlist_matcher: {
            title: "Matcher de Playlist Festival",
            subtitle: "Trouvez des festivals qui correspondent à vos goûts musicaux basés sur votre playlist"
          },
          // Lockers
          lockers: {
            title: "GrooveNomad x LockerZ",
            subtitle: "Solutions de stockage sécurisées pour les festivaliers. Voyagez léger, fêtez fort.",
            features: {
              secure_storage: "Stockage Sécurisé",
              secure_storage_desc: "Casiers de pointe avec serrures électroniques et surveillance sécuritaire 24h/24.",
              convenient_locations: "Emplacements Pratiques",
              convenient_locations_desc: "Situés aux principales entrées de festivals et centres de transport.",
              flexible_hours: "Horaires Flexibles",
              flexible_hours_desc: "Disponibles pendant toute la durée du festival avec accès 24h/24."
            },
            pricing: {
              title: "Prix",
              transparent: "Simples et Transparents"
            },
            locations: {
              title: "Trouvez un",
              lockerz: "LockerZ",
              near_you: "Près de Vous",
              description: "Stratégiquement placés dans les principales salles de festivals et centres de transport à travers l'Europe.",
              view_locations: "Voir les Emplacements"
            }
          },
          // Common
          common: {
            cancel: "Annuler",
            back_to_home: "Retour à l'Accueil"
          }
        }
      },
      es: {
        translation: {
          // Navigation
          nav: {
            festivals: "Festivales",
            destinations: "Destinos", 
            lockers: "GrooveNomad x LockerZ",
            playlist_matcher: "Matcher de Playlist"
          },
          // Hero section
          hero: {
            title: "Tu Aventura Festival Empieza Aquí",
            subtitle: "Encuentra la experiencia festival perfecta adaptada a tus preferencias",
            search_placeholder: "Pregunta a la IA: 'Encuéntrame festivales electrónicos en Europa este verano'",
            thinking: "Pensando...",
            ask_ai: "Preguntar a la IA"
          },
          // Quick actions
          quick_actions: {
            find_destinations: "Encontrar Destinos",
            find_destinations_desc: "Descubre puntos calientes de festivales alrededor del mundo",
            discover_artists: "Descubrir Artistas", 
            discover_artists_desc: "Explora nueva música y tus artistas favoritos"
          },
          // AI Response
          ai_response: {
            title: "Recomendaciones IA"
          },
          // Actions
          action: {
            get_quote: "Obtener Presupuesto",
            personalized: "Obtén recomendaciones personalizadas de festivales",
            quick_book: "Reserva Rápida"
          },
          // Client Experiences
          client_experiences: {
            title: "Experiencias Festival Reales",
            subtitle: "Lee reseñas auténticas e historias de festivaleros que encontraron su aventura perfecta a través de Groove Nomad.",
            cta: "¡Únete a miles de amantes de la música que han descubierto su experiencia festival perfecta a través de nuestras recomendaciones IA. ¡Tu aventura te espera!"
          },
          // Festival Examples
          festival_examples: {
            title: "Aventuras Festival Destacadas", 
            loading: "Cargando experiencias festival increíbles..."
          },
          // Features
          features: {
            title: "Potenciado por",
            ai_intelligence: "Inteligencia Artificial",
            subtitle: "Nuestro asistente IA te ayuda a descubrir la experiencia festival perfecta basada en tus preferencias, ubicación y gustos musicales.",
            smart_recommendations: "Recomendaciones Inteligentes",
            smart_recommendations_desc: "Obtén sugerencias personalizadas basadas en tu gusto musical, presupuesto y preferencias de viaje.",
            global_coverage: "Cobertura Global",
            global_coverage_desc: "Descubre festivales de todo el mundo con información detallada y consejos de viaje.",
            music_discovery: "Descubrimiento Musical",
            music_discovery_desc: "Encuentra nuevos artistas y géneros mientras exploras festivales que coinciden con tu viaje musical."
          },
          // Footer
          footer: {
            subtitle: "Descubre tu próxima aventura festival con recomendaciones IA",
            discord: "Únete a nuestra comunidad Discord"
          },
          // Form
          form: {
            title: "Obtén Tu Presupuesto Personalizado",
            description: "Cuéntanos sobre tus preferencias de festival y crearemos una experiencia personalizada para ti.",
            contact: {
              title: "Información de Contacto",
              full_name: "Nombre Completo",
              full_name_placeholder: "Juan Pérez",
              email: "Dirección de Email", 
              email_placeholder: "juan@example.com",
              phone: "Número de Teléfono",
              phone_placeholder: "+34 612 345 678"
            },
            trip: {
              title: "Detalles del Viaje",
              budget: "Rango de Presupuesto (EUR)",
              budget_placeholder: "Selecciona tu presupuesto",
              travelers: "Número de Viajeros",
              travelers_placeholder: "¿Cuántas personas?",
              dates: "Fechas de Viaje Preferidas",
              dates_placeholder: "ej: Julio 2024, Verano 2024",
              duration: "Duración del Viaje",
              duration_placeholder: "¿Cuánto tiempo?"
            },
            preferences: {
              music_title: "Preferencias Musicales"
            },
            accommodation: {
              title: "Alojamiento y Transporte",
              preference: "Preferencia de Alojamiento",
              preference_placeholder: "Selecciona tipo de alojamiento",
              transport: "Necesidades de Transporte",
              transport_placeholder: "Preferencias de transporte"
            },
            special: {
              title: "Requisitos Especiales"
            },
            submit: "Obtener Mi Presupuesto Personalizado"
          },
          // Payment
          payment: {
            complete_booking: "Completar Tu Reserva",
            secure_spot: "Asegura tu lugar en {{festival}}",
            capacity: "{{count}} de capacidad",
            email: "Email",
            email_placeholder: "tu@email.com",
            card_number: "Número de Tarjeta",
            card_number_placeholder: "1234 5678 9012 3456",
            expiry: "Vencimiento",
            expiry_placeholder: "MM/AA",
            cvc: "CVC",
            cvc_placeholder: "123",
            total: "Total",
            processing: "Procesando...",
            pay_amount: "Pagar €{{amount}}",
            success_title: "¡Pago Exitoso! 🎉",
            success_description: "Tus boletos de festival han sido confirmados. Revisa tu email para los detalles.",
            success_message: "Tus boletos para {{festival}} han sido confirmados.",
            confirmation_sent: "Email de confirmación enviado",
            digital_tickets: "Boletos digitales disponibles en la app",
            get_ready: "¡Prepárate para una experiencia increíble!",
            done: "Listo"
          },
          // Playlist Matcher  
          playlist_matcher: {
            title: "Matcher de Playlist Festival",
            subtitle: "Encuentra festivales que coincidan con tu gusto musical basado en tu playlist"
          },
          // Lockers
          lockers: {
            title: "GrooveNomad x LockerZ",
            subtitle: "Soluciones de almacenamiento seguro para festivaleros. Viaja ligero, celebra duro.",
            features: {
              secure_storage: "Almacenamiento Seguro",
              secure_storage_desc: "Casilleros de última generación con cerraduras electrónicas y monitoreo de seguridad 24/7.",
              convenient_locations: "Ubicaciones Convenientes",
              convenient_locations_desc: "Ubicados en las principales entradas de festivales y centros de transporte.",
              flexible_hours: "Horarios Flexibles",
              flexible_hours_desc: "Disponibles durante toda la duración del festival con acceso 24/7."
            },
            pricing: {
              title: "Precios",
              transparent: "Simples y Transparentes"
            },
            locations: {
              title: "Encuentra un",
              lockerz: "LockerZ",
              near_you: "Cerca de Ti",
              description: "Estratégicamente ubicados en los principales lugares de festivales y centros de transporte a través de Europa.",
              view_locations: "Ver Ubicaciones"
            }
          },
          // Common
          common: {
            cancel: "Cancelar",
            back_to_home: "Volver al Inicio"
          }
        }
      }
    }
  });

export default i18n;