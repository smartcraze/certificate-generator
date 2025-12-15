# Certificate Generator SaaS

A modern, clean certificate generator SaaS application built with Next.js, allowing users to create, customize, and manage certificate templates.

## Features

### Current Version (v1.0)
- 🎨 **Template Editor**: Interactive certificate editor with drag-and-drop elements using Fabric.js
- 📝 **Custom Templates**: Upload your own certificate designs
- 🎯 **Prebuilt Templates**: Choose from professionally designed templates
- 👥 **Multi-Project Support**: Organize certificates into projects
- 🔐 **Google Authentication**: Secure login with NextAuth
- 🎨 **Clean UI**: Built with shadcn/ui components and Tailwind CSS
- ✏️ **Rich Text Editor**: Add and customize text with various fonts, sizes, and colors
- 🖼️ **Element Management**: Add shapes, text, and images to your certificates

### Planned Features (v2.0)
- 📊 **Bulk Generation**: Upload CSV/Excel files to generate certificates in bulk
- 🏢 **Organization Support**: Team management and role-based access
- 📧 **Email Distribution**: Automatically send certificates to recipients
- 🔗 **QR Code Verification**: Add verifiable QR codes to certificates
- 📱 **Certificate Portal**: Public verification portal for certificates

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with Google Provider
- **UI Components**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS v4
- **Canvas**: Fabric.js for certificate editing
- **File Upload**: React Dropzone
- **QR Generation**: qrcode library
- **Package Manager**: Bun

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- PostgreSQL database
- Google OAuth credentials

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd certificate-generator
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/certificates"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth
GOOGLE_ID="your-google-client-id"
GOOGLE_SECRET="your-google-client-secret"
```

4. Run database migrations:
```bash
bun prisma migrate dev
bun prisma generate
```

5. Start the development server:
```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Usage

### Creating a Project

1. Sign in with Google from the landing page
2. Click "New Project" from the dashboard
3. Enter project name and optional description
4. Click "Create Project"

### Creating a Template

1. Open a project from your dashboard
2. Click "New Template"
3. Enter a template name
4. Either upload your design or choose a prebuilt template
5. Click "Continue to Editor"

### Editing a Template

The certificate editor provides a powerful canvas-based interface:

- **Add Text**: Click "Add Text" to insert editable text
- **Add Shape**: Click "Add Shape" to insert rectangles
- **Edit Properties**: Select elements to customize fonts, colors, alignment, etc.
- **Save**: Click "Save Template" to save your changes
- **Preview**: Click "Preview" to download a PNG preview

## Development

### Adding UI Components

```bash
bunx shadcn@latest add <component-name>
```

### Database Changes

```bash
bun prisma migrate dev --name <migration-name>
bun prisma generate
```

## License

MIT License
