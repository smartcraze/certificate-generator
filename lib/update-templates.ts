import prisma from './db';

async function updateTemplateUrls() {
  console.log('Updating old template URLs...');
  
  const urlMappings = [
    {
      old: 'https://via.placeholder.com/1200x849/4F46E5/FFFFFF?text=Classic+Certificate+Template',
      new: '/templates/classic-certificate.svg'
    },
    {
      old: 'https://via.placeholder.com/1200x849/10B981/FFFFFF?text=Modern+Achievement+Template',
      new: '/templates/modern-achievement.svg'
    },
    {
      old: 'https://via.placeholder.com/1200x849/F59E0B/FFFFFF?text=Elegant+Award+Template',
      new: '/templates/elegant-award.svg'
    }
  ];

  for (const mapping of urlMappings) {
    const result = await prisma.template.updateMany({
      where: {
        fileUrl: mapping.old
      },
      data: {
        fileUrl: mapping.new
      }
    });
    
    if (result.count > 0) {
      console.log(`✓ Updated ${result.count} template(s) from ${mapping.old.substring(0, 50)}...`);
    }
  }
  
  console.log('✓ Template URLs updated successfully!');
}

updateTemplateUrls()
  .catch((error) => {
    console.error('Error updating templates:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
