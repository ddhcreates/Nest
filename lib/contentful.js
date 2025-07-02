import { createClient } from 'contentful';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

// Fetch all services
export const getServices = async () => {
  try {
    const response = await client.getEntries({
      content_type: 'service',
      order: 'sys.createdAt'
    });
    return response.items.map(item => ({
      name: item.fields.name,
      subtitle: item.fields.subtitle,
      description: item.fields.description,
      features: item.fields.features || [],
      price: item.fields.price,
      iconName: item.fields.iconName
    }));
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
};

// Fetch all guides
export const getGuides = async () => {
  try {
    const response = await client.getEntries({
      content_type: 'guide',
      order: 'sys.createdAt'
    });
    return response.items.map(item => ({
      title: item.fields.title,
      description: item.fields.description,
      downloadUrl: item.fields.downloadUrl,
      rating: item.fields.rating || 5
    }));
  } catch (error) {
    console.error('Error fetching guides:', error);
    return [];
  }
};

// Fetch site settings
export const getSiteSettings = async () => {
  try {
    const response = await client.getEntries({
      content_type: 'siteSettings',
      limit: 1
    });
    if (response.items.length > 0) {
      const settings = response.items[0].fields;
      return {
        heroTitle: settings.heroTitle,
        heroSubtitle: settings.heroSubtitle,
        contactEmail: settings.contactEmail,
        contactPhone: settings.contactPhone
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
};

export default client;