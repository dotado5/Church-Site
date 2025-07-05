# MOJ Church Admin Panel

A comprehensive content management system for the Minds of Josiah Church website. This admin panel allows church administrators to manage articles, coordinators, activities, gallery photos, authors, and pastors through a secure, user-friendly interface.

## Features

### 🔐 Authentication & Security
- Secure login system with NextAuth.js
- Password hashing with bcrypt
- JWT-based sessions
- Protected routes and middleware
- Role-based access control

### 📝 Content Management
- **Articles**: Create, edit, delete, and manage articles
- **Coordinators**: Manage church coordinators and their information
- **Activities**: Schedule and manage church activities and events
- **Gallery**: Upload and organize church photos and memories
- **Authors**: Manage article authors and their profiles
- **Pastors**: Manage pastor information and messages

### 🎨 Modern UI/UX
- Clean, responsive design with Tailwind CSS
- Intuitive dashboard with statistics
- Form validation and error handling
- Toast notifications for user feedback
- Mobile-friendly interface

### 📊 Dashboard Features
- Real-time statistics overview
- Quick action buttons
- Recent activity feed
- Search and filter capabilities

## Prerequisites

Before setting up the admin panel, ensure you have:

1. **Node.js** (v16 or higher)
2. **MongoDB** (running locally or remote connection)
3. **MOJ Backend API** (running on localhost:8000)

## Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd Church-Site/Admin
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create environment file**:
   Create a `.env.local` file in the root directory with the following variables:
   ```bash
   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-super-secret-key-change-in-production
   
   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/moj_church_db
   
   # API Configuration
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. **Set up admin user**:
   Run the setup script to create your first admin user:
   ```bash
   npm run setup
   ```
   
   Follow the prompts to enter:
   - Admin name
   - Admin email
   - Admin password (minimum 6 characters)

## Running the Application

### Development Mode
```bash
npm run dev
```

The admin panel will be available at `http://localhost:3000`

### Production Mode
```bash
npm run build
npm start
```

## Usage

### First Login
1. Navigate to `http://localhost:3000/login`
2. Enter the admin credentials you created during setup
3. You'll be redirected to the dashboard

### Managing Content

#### Articles
- **View all articles**: Go to Articles section
- **Create new article**: Click "New Article" button
- **Edit article**: Click "Edit" button on any article
- **Delete article**: Click "Delete" button and confirm
- **Search articles**: Use the search bar to find specific articles
- **Filter by author**: Use the author dropdown to filter articles

#### Coordinators
- **Add coordinator**: Click "Add New Coordinator" on dashboard
- **Manage coordinators**: Navigate to Coordinators section
- **Update coordinator info**: Edit coordinator details and contact information

#### Activities
- **Schedule activity**: Click "Schedule New Activity" on dashboard
- **View activities**: Navigate to Activities section
- **Edit events**: Update activity details and dates

#### Gallery Management
- **Upload photos**: Add new photos to the gallery
- **Organize by events**: Associate photos with specific activities
- **Manage albums**: Create and organize photo collections

### Dashboard Features

The dashboard provides:
- **Statistics cards**: Quick overview of content counts
- **Quick actions**: Shortcuts to create new content
- **Recent activity**: Track recent changes and updates

## API Integration

The admin panel integrates with the MOJ Backend API for:
- **Articles**: CRUD operations for articles
- **Coordinators**: Managing church leadership
- **Activities**: Event scheduling and management
- **Gallery**: Photo upload and organization
- **Authors**: Writer profile management
- **Pastors**: Pastor information and messages

## Security Features

### Authentication
- Secure credential-based authentication
- Session management with JWT tokens
- Automatic session expiration
- Protected route middleware

### Data Protection
- Password hashing with bcrypt
- Input validation and sanitization
- XSS protection
- CSRF protection

## File Structure

```
Church-Site/Admin/
├── src/
│   ├── app/
│   │   ├── (main)/           # Protected admin routes
│   │   │   ├── articles/     # Article management
│   │   │   ├── coordinators/ # Coordinator management
│   │   │   ├── activities/   # Activity management
│   │   │   ├── memories/     # Gallery management
│   │   │   ├── authors/      # Author management
│   │   │   └── pastors/      # Pastor management
│   │   ├── api/
│   │   │   ├── auth/         # NextAuth API routes
│   │   │   └── setup/        # Setup API routes
│   │   ├── login/            # Login page
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Dashboard
│   ├── components/
│   │   ├── AuthenticatedLayout.tsx
│   │   ├── Providers.tsx
│   │   └── Sidebar.tsx
│   ├── lib/
│   │   └── auth.ts           # NextAuth configuration
│   └── types/
│       └── next-auth.d.ts    # TypeScript declarations
├── scripts/
│   └── setup-admin.ts        # Admin setup script
├── package.json
└── README.md
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXTAUTH_URL` | Base URL for NextAuth | Yes |
| `NEXTAUTH_SECRET` | Secret for JWT signing | Yes |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `NEXT_PUBLIC_API_URL` | Backend API URL | Yes |

## Troubleshooting

### Common Issues

1. **Cannot connect to MongoDB**
   - Ensure MongoDB is running on your system
   - Check the `MONGODB_URI` in your `.env.local` file

2. **API calls failing**
   - Verify the backend API is running on localhost:8000
   - Check the `NEXT_PUBLIC_API_URL` environment variable

3. **Authentication issues**
   - Ensure `NEXTAUTH_SECRET` is set in environment variables
   - Try logging out and logging back in

4. **Port conflicts**
   - If port 3000 is in use, Next.js will automatically use the next available port
   - Update `NEXTAUTH_URL` accordingly

### Getting Help

If you encounter issues:
1. Check the browser console for error messages
2. Check the terminal/server logs
3. Verify all environment variables are set correctly
4. Ensure the backend API is running and accessible

## Contributing

When contributing to the admin panel:
1. Follow the existing code structure
2. Add proper TypeScript types
3. Include error handling
4. Test authentication flows
5. Ensure responsive design

## License

This project is part of the MOJ Church website system.
