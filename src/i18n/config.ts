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
          'hero.title': 'Your Festival Adventure Starts Here',
          'hero.subtitle': 'Find the perfect festival experience tailored to your preferences',
          'action.get_quote': 'Get Quote',
          'action.browse_events': 'Browse Events',
          'action.ask_ai': 'Ask AI Assistant',
          'action.personalized': 'Get personalized festival recommendations',
          'experiences.title': 'Festival Experiences',
          'form': {
            'title': 'Get Your Personalized Festival Quote',
            'description': 'Complete this form to receive a customized quote and recommendations based on your preferences',
            'contact': {
              'title': 'Contact Information',
              'name': 'Full Name',
              'email': 'Email Address',
              'phone': 'Phone Number'
            },
            'trip': {
              'title': 'Trip Details',
              'budget': 'Budget Range (EUR)',
              'travelers': 'Number of Travelers',
              'dates': 'Preferred Travel Dates',
              'duration': 'Trip Duration'
            },
            'music': {
              'title': 'Music Preferences'
            },
            'accommodation': {
              'title': 'Accommodation & Transport',
              'preference': 'Accommodation Preference',
              'transport': 'Transport Needs'
            },
            'special': {
              'title': 'Special Requirements',
              'dietary': 'Dietary Requirements',
              'accessibility': 'Accessibility Needs',
              'previous': 'Previous Festival Experience',
              'requests': 'Special Requests or Notes'
            },
            'submit': 'Get My Personalized Quote',
            'placeholders': {
              'name': 'John Doe',
              'email': 'john@example.com',
              'phone': '+1 (555) 123-4567',
              'budget': 'Select your budget',
              'travelers': 'How many people?',
              'dates': 'e.g., July 2024, Summer 2024',
              'duration': 'How long?',
              'accommodation': 'Select accommodation type',
              'transport': 'Transport preferences',
              'dietary': 'e.g., Vegetarian, Vegan, Gluten-free',
              'accessibility': 'Any accessibility requirements',
              'previous': 'Tell us about festivals you\'ve enjoyed before...',
              'special': 'Any special celebrations, group requirements, or other requests...'
            }
          }
        }
      },
      fr: {
        translation: {
          'hero.title': 'Votre Aventure Festival Commence Ici',
          'hero.subtitle': 'Trouvez l\'expérience festival parfaite adaptée à vos préférences',
          'action.get_quote': 'Obtenir un Devis',
          'action.browse_events': 'Parcourir les Événements',
          'action.ask_ai': 'Demander à l\'Assistant IA',
          'action.personalized': 'Obtenez des recommandations personnalisées de festivals',
          'experiences.title': 'Expériences Festival',
          'form': {
            'title': 'Obtenez Votre Devis Festival Personnalisé',
            'description': 'Remplissez ce formulaire pour recevoir un devis personnalisé et des recommandations basées sur vos préférences',
            'contact': {
              'title': 'Coordonnées',
              'name': 'Nom Complet',
              'email': 'Adresse Email',
              'phone': 'Numéro de Téléphone'
            },
            'trip': {
              'title': 'Détails du Voyage',
              'budget': 'Fourchette de Budget (EUR)',
              'travelers': 'Nombre de Voyageurs',
              'dates': 'Dates de Voyage Préférées',
              'duration': 'Durée du Séjour'
            },
            'music': {
              'title': 'Préférences Musicales'
            },
            'accommodation': {
              'title': 'Hébergement & Transport',
              'preference': 'Préférence d\'Hébergement',
              'transport': 'Besoins en Transport'
            },
            'special': {
              'title': 'Exigences Spéciales',
              'dietary': 'Régime Alimentaire',
              'accessibility': 'Besoins d\'Accessibilité',
              'previous': 'Expérience Festival Précédente',
              'requests': 'Demandes Spéciales ou Notes'
            },
            'submit': 'Obtenir Mon Devis Personnalisé',
            'placeholders': {
              'name': 'Jean Dupont',
              'email': 'jean@example.com',
              'phone': '+33 6 12 34 56 78',
              'budget': 'Sélectionnez votre budget',
              'travelers': 'Combien de personnes ?',
              'dates': 'ex: Juillet 2024, Été 2024',
              'duration': 'Durée ?',
              'accommodation': 'Type d\'hébergement',
              'transport': 'Préférences de transport',
              'dietary': 'ex: Végétarien, Végétalien, Sans gluten',
              'accessibility': 'Besoins d\'accessibilité',
              'previous': 'Parlez-nous des festivals que vous avez appréciés...',
              'special': 'Célébrations spéciales, besoins de groupe ou autres demandes...'
            }
          }
        }
      },
      es: {
        translation: {
          'hero.title': 'Tu Aventura Festival Empieza Aquí',
          'hero.subtitle': 'Encuentra la experiencia festival perfecta adaptada a tus preferencias',
          'action.get_quote': 'Obtener Presupuesto',
          'action.browse_events': 'Explorar Eventos',
          'action.ask_ai': 'Preguntar al Asistente IA',
          'action.personalized': 'Obtén recomendaciones personalizadas de festivales',
          'experiences.title': 'Experiencias Festival',
          'form': {
            'title': 'Obtén Tu Presupuesto Festival Personalizado',
            'description': 'Completa este formulario para recibir un presupuesto personalizado y recomendaciones basadas en tus preferencias',
            'contact': {
              'title': 'Información de Contacto',
              'name': 'Nombre Completo',
              'email': 'Correo Electrónico',
              'phone': 'Número de Teléfono'
            },
            'trip': {
              'title': 'Detalles del Viaje',
              'budget': 'Rango de Presupuesto (EUR)',
              'travelers': 'Número de Viajeros',
              'dates': 'Fechas Preferidas',
              'duration': 'Duración del Viaje'
            },
            'music': {
              'title': 'Preferencias Musicales'
            },
            'accommodation': {
              'title': 'Alojamiento y Transporte',
              'preference': 'Preferencia de Alojamiento',
              'transport': 'Necesidades de Transporte'
            },
            'special': {
              'title': 'Requisitos Especiales',
              'dietary': 'Requisitos Dietéticos',
              'accessibility': 'Necesidades de Accesibilidad',
              'previous': 'Experiencia Previa en Festivales',
              'requests': 'Peticiones Especiales o Notas'
            },
            'submit': 'Obtener Mi Presupuesto Personalizado',
            'placeholders': {
              'name': 'Juan Pérez',
              'email': 'juan@example.com',
              'phone': '+34 612 345 678',
              'budget': 'Selecciona tu presupuesto',
              'travelers': '¿Cuántas personas?',
              'dates': 'ej: Julio 2024, Verano 2024',
              'duration': '¿Duración?',
              'accommodation': 'Tipo de alojamiento',
              'transport': 'Preferencias de transporte',
              'dietary': 'ej: Vegetariano, Vegano, Sin gluten',
              'accessibility': 'Necesidades de accesibilidad',
              'previous': 'Cuéntanos sobre los festivales que has disfrutado...',
              'special': 'Celebraciones especiales, necesidades de grupo u otras peticiones...'
            }
          }
        }
      }
    }
  });

export default i18n;