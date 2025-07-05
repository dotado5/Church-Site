# 📧 EmailJS Setup Guide for MOJ Contact Form

## 🎯 Overview
This guide will help you set up EmailJS to enable your contact form to send real emails to your church inbox.

## 📋 Prerequisites
- A valid email account (Gmail, Outlook, Yahoo, etc.)
- Access to your EmailJS account (or create one)
- About 15-20 minutes of setup time

---

## 🚀 Step-by-Step Setup

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up"** and create a free account
3. Verify your email address
4. Login to your EmailJS dashboard

### Step 2: Connect Your Email Service
1. In the EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (recommended)
   - **Outlook/Hotmail**
   - **Yahoo**
   - **Custom SMTP**
4. Follow the setup wizard to connect your email
5. **Important**: Copy the **Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template
1. Go to **"Email Templates"** in the dashboard
2. Click **"Create New Template"**
3. Choose a template name (e.g., "MOJ Contact Form")
4. **Copy and paste** the content from `emailjs-template-sample.html` into the template editor
5. **Important**: Make sure these variables are included:
   - `{{name}}`
   - `{{email}}`
   - `{{subject}}`
   - `{{message}}`
   - `{{submitted_at}}`
6. Set the email subject: `New Contact Form Submission from {{name}}`
7. Set the "To Email" to your church email: `fatokivictor2@gmail.com`
8. Set the "Reply To" field to: `{{reply_to}}`
9. Test the template with sample data
10. **Save** and copy the **Template ID** (e.g., `template_xyz789`)

### Step 4: Get Your User ID
1. Go to **"Account"** in the EmailJS dashboard
2. Copy your **User ID** (also called Public Key)
3. It looks like: `user_abcdef123456`

### Step 5: Update Environment Variables
1. Open the `.env.local` file in your Frontend folder
2. Replace the placeholder values:

```env
# Replace these with your actual EmailJS credentials
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
NEXT_PUBLIC_EMAILJS_USER_ID=user_abcdef123456
```

### Step 6: Restart Development Server
```bash
# Stop your current server (Ctrl+C) and restart
npm run dev
```

---

## 🧪 Testing Your Setup

### Test the Contact Form
1. Go to your website's contact page
2. Fill out the form with test data
3. Click "Send Message"
4. Check your email inbox for the message
5. Verify all form data appears correctly

### Expected Behavior
- **✅ Success**: Green message appears, form resets, email received
- **❌ Error**: Red message appears with alternative contact info

---

## 🔧 Troubleshooting

### Common Issues

#### 1. "EmailJS is not configured" Error
- **Problem**: Environment variables not set correctly
- **Solution**: Double-check your `.env.local` file values
- **Check**: Make sure values don't contain `your_*_here`

#### 2. "400 Bad Request" Error
- **Problem**: Template variables don't match
- **Solution**: Ensure template includes: `{{name}}`, `{{email}}`, `{{subject}}`, `{{message}}`

#### 3. "403 Access Denied" Error
- **Problem**: Service configuration issue
- **Solution**: Verify email service is properly connected in EmailJS dashboard

#### 4. "429 Rate Limit" Error
- **Problem**: Too many requests (free tier: 200/month)
- **Solution**: Wait or upgrade to paid plan

#### 5. Emails Not Received
- **Check**: Spam/junk folder
- **Check**: Email service connection in EmailJS
- **Check**: "To Email" field in template

### Debug Steps
1. Open browser developer tools (F12)
2. Go to Console tab
3. Submit the form
4. Look for error messages
5. Check if environment variables are loaded correctly

---

## 💰 Pricing Information

### Free Tier
- **200 emails per month**
- **Perfect for small churches**
- **No credit card required**

### Paid Plans
- **Personal**: $15/month (1,000 emails)
- **Professional**: $30/month (3,000 emails)
- **Enterprise**: Custom pricing

---

## 🔒 Security Notes

### Domain Restrictions
1. In EmailJS dashboard, go to **"Account" > "Security"**
2. Add your domain to restrict access:
   - `localhost:3000` (for development)
   - `your-church-site.vercel.app` (for production)
3. This prevents unauthorized use of your EmailJS account

### Environment Variables
- **Never commit** `.env.local` to version control
- **Add** `.env.local` to your `.gitignore` file
- **Use different** EmailJS accounts for development/production

---

## 📝 Email Template Variables

The following variables are sent from your contact form:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{name}}` | User's name | "John Doe" |
| `{{email}}` | User's email | "john@example.com" |
| `{{subject}}` | Message subject | "Question about services" |
| `{{message}}` | User's message | "Hi, I'd like to know more..." |
| `{{submitted_at}}` | Submission time | "December 20, 2024, 2:30 PM" |
| `{{reply_to}}` | Reply address | Same as user's email |

---

## 🎉 Success!

Once configured, your contact form will:
- ✅ Send real emails to your church inbox
- ✅ Include all form data in a professional format
- ✅ Allow direct reply to the user
- ✅ Show success/error messages to users
- ✅ Reset the form after successful submission

## 📞 Need Help?

If you encounter issues:
1. Check the troubleshooting section above
2. Review the browser console for error messages
3. Verify your EmailJS dashboard configuration
4. Test with a simple template first

---

**Happy emailing! 📧✨** 