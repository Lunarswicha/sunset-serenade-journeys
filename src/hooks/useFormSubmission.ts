import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ClientFormData } from '@/components/ClientDetailsForm';

export const useFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitToMakecom = async (formData: ClientFormData, webhookUrl?: string) => {
    const makeWebhook = webhookUrl || 'https://hook.eu2.make.com/YOUR_WEBHOOK_ID'; // Replace with actual webhook
    
    const payload = {
      timestamp: new Date().toISOString(),
      source: 'groovefest_ai_form',
      client_data: {
        contact: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        },
        trip_details: {
          budget: formData.budget,
          travelers: formData.numTravelers,
          dates: formData.travelDates,
          duration: formData.duration
        },
        preferences: {
          music_genres: formData.musicGenres,
          accommodation: formData.accommodationType,
          transport: formData.transportNeeds,
          dietary: formData.dietaryRequirements,
          accessibility: formData.accessibility
        },
        additional: {
          special_requests: formData.specialRequests,
          previous_festivals: formData.previousFestivals,
          original_query: formData.originalQuery,
          ai_recommendation: formData.aiRecommendation
        }
      }
    };

    try {
      const response = await fetch(makeWebhook, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify(payload)
      });

      console.log('Form data sent to Make.com webhook');
      return { success: true };
    } catch (error) {
      console.error('Error sending to Make.com:', error);
      throw error;
    }
  };

  const saveToDatabase = async (formData: ClientFormData) => {
    try {
      const { data, error } = await supabase
        .from('user_queries')
        .insert({
          query: formData.originalQuery || 'Form submission',
          query_type: 'detailed_form',
          response: JSON.stringify(formData)
        });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving to database:', error);
      throw error;
    }
  };

  const submitForm = async (formData: ClientFormData, webhookUrl?: string) => {
    setIsSubmitting(true);
    try {
      // Save to database
      await saveToDatabase(formData);
      
      // Send to Make.com webhook
      await submitToMakecom(formData, webhookUrl);
      
      return { success: true };
    } catch (error) {
      console.error('Form submission error:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitForm,
    isSubmitting
  };
};