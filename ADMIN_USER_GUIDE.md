# Savage Squad Website - Admin Panel User Guide

## Table of Contents
1. [Getting Started](#getting-started)
2. [Dashboard Overview](#dashboard-overview)
3. [Content Editor](#content-editor)
4. [Testimonials Manager](#testimonials-manager)
5. [FAQ Manager](#faq-manager)
6. [Best Practices](#best-practices)
7. [Troubleshooting](#troubleshooting)

---

## Getting Started

### Accessing the Admin Panel

1. Navigate to your website's admin login page: `yourwebsite.com/admin/login`
2. Enter your admin email and password
3. Click "Login"
4. You'll be automatically redirected to the Analytics Dashboard

### First Time Login

Your admin credentials should have been provided separately. Keep them secure and don't share them with unauthorized personnel.

**Note:** Your session will remain active for 7 days. After that, you'll need to log in again.

---

## Dashboard Overview

**Location:** `/admin` (This is your main hub after logging in)

### What You'll See

The Dashboard provides real-time analytics about your website's performance:

#### Key Metrics
- **Total Views**: The total number of page views across your entire website
- **Unique Visitors**: The number of different people who visited your site

#### Analytics Features

1. **Time Period Filters**
   - View data for the last 7, 30, or 90 days
   - Click the buttons at the top to switch between time periods

2. **Traffic Trends Chart**
   - Visual line graph showing daily traffic patterns
   - Helps you identify peaks and trends in visitor activity

3. **Auto-Refresh**
   - The dashboard automatically updates every 30 seconds
   - Always shows the most current data

4. **Navigation**
   - Use the top navigation bar to access different admin sections
   - Click "View Site" to open your public website in a new tab
   - Click "Logout" when you're done managing the site

---

## Content Editor

**Location:** `/admin/editor`

The Content Editor allows you to modify text and images throughout your website without touching any code.

### How to Edit Content

1. **Navigate to the Editor**
   - Click "Editor" in the navigation menu
   - You'll see all editable sections of your website

2. **Editing Text Content**
   - Find the section you want to edit
   - Click the "Edit" button next to it
   - A modal window will open with a rich text editor

3. **Using the Rich Text Editor**

   The editor toolbar provides formatting options:

   - **Text Styles**: Headers (H1, H2, H3), Bold, Italic, Underline
   - **Colors**: Change text color or background color
   - **Alignment**: Left, center, right alignment
   - **Lists**: Create bullet points or numbered lists
   - **Links**: Add hyperlinks to text
   - **Clean**: Remove all formatting

   **Example Use Cases:**
   - Make a heading: Select text and choose "Header 1" or "Header 2"
   - Emphasize text: Use Bold or change the text color
   - Add a link: Select text, click the link icon, and enter the URL

4. **Saving Your Changes**
   - Click the "Save" button
   - You'll see a success notification
   - Changes appear on your website immediately

### Editing Images

1. **Select an Image Section**
   - Find the image you want to replace
   - Click "Edit" or the image upload button

2. **Upload New Image**
   - **Drag and Drop**: Simply drag an image file into the upload area
   - **Click to Browse**: Click the upload area to select a file from your computer

3. **Supported Image Formats**
   - PNG, JPG, JPEG, GIF, WebP

4. **Image Optimization**
   - The system automatically optimizes your images
   - Images are resized (maximum 2000x2000 pixels) and compressed
   - You'll see compression statistics after upload

5. **Alt Text (Important for SEO)**
   - Always provide descriptive alt text for images
   - This helps with search engine optimization and accessibility
   - Example: "Team meeting in conference room" instead of "image1.jpg"

6. **Save the Image**
   - Click "Save" or "Upload"
   - The new image will replace the old one instantly

### Tips for Content Editing

- **Preview Before Saving**: Review your changes in the editor before clicking save
- **Keep Backups**: Major text changes are tracked in version history
- **Image Quality**: Upload high-quality images (the system will optimize them automatically)
- **Consistent Formatting**: Use the same header styles throughout for a professional look

---

## Testimonials Manager

**Location:** `/admin/testimonials`

Manage customer testimonials that appear on your website.

### What You Can Do

- Add new testimonials from satisfied customers
- Edit existing testimonials
- Delete outdated testimonials
- Control which testimonials are visible on your site
- Set the order in which testimonials appear

### Adding a New Testimonial

1. Click the "Add Testimonial" button
2. Fill in the required fields:

   - **Name**: Customer's full name (required)
   - **Occupation**: Customer's job title or company (required)
   - **Testimonial Text**: The actual testimonial/review (required)
   - **Star Rating**: Choose 1 to 5 stars
   - **Profile Image**: Upload the customer's photo (optional but recommended)
   - **Display Order**: The position in the testimonial list (see ordering section below)
   - **Active Status**: Toggle on to make it visible immediately

3. Click "Save"

### Editing a Testimonial

1. Find the testimonial in the table
2. Click the "Edit" button
3. Modify any fields
4. Click "Save"

### Deleting a Testimonial

1. Find the testimonial you want to remove
2. Click the "Delete" button
3. Confirm the deletion in the popup dialog
4. **Warning**: This action cannot be undone!

### Managing Display Order

The "Order" number determines where testimonials appear on your website:

- **Lower numbers appear first** (1 shows before 2, which shows before 3, etc.)
- When adding a new testimonial, the system suggests the next available number
- You can manually set any order number you prefer
- If you enter a number that's already in use, the system will automatically adjust

**Example:**
- Order 1: John Doe's testimonial (appears first)
- Order 2: Jane Smith's testimonial (appears second)
- Order 3: Bob Johnson's testimonial (appears third)

### Active/Inactive Status

- **Active** (green badge): Testimonial is visible on your website
- **Inactive** (red badge): Testimonial is hidden but not deleted

**When to use Inactive:**
- You want to temporarily hide a testimonial without deleting it
- You're preparing testimonials to publish later
- You want to rotate testimonials seasonally

### Uploading Profile Images

1. Click "Choose File" or the upload area
2. Select an image from your computer
3. Supported formats: PNG, JPG, JPEG, GIF, WebP
4. The system automatically optimizes the image
5. Click "Save" to apply

### Best Practices for Testimonials

- **Get Permission**: Always get written permission before publishing customer testimonials
- **Use Real Photos**: Authentic profile pictures build trust
- **Keep it Recent**: Regularly update testimonials to show current customer satisfaction
- **Vary Industries**: Show testimonials from different types of customers if possible
- **Proofread**: Check for spelling and grammar before publishing
- **Star Ratings**: Be honest with ratings (4-5 stars are typically published)

---

## FAQ Manager

**Location:** `/admin/faq`

Manage Frequently Asked Questions that help your website visitors find answers quickly.

### What You Can Do

- Add new FAQ entries
- Edit questions and answers
- Delete outdated FAQs
- Control which FAQs are visible
- Set the order of FAQs on your site

### Adding a New FAQ

1. Click the "Add FAQ" button
2. Fill in the fields:

   - **Question**: The question your customers frequently ask (required)
   - **Answer**: Your detailed answer (required)
   - **Display Order**: Position in the FAQ list
   - **Active Status**: Toggle on to make it visible immediately

3. Click "Save"

### Editing an FAQ

1. Find the FAQ in the table
2. Click the "Edit" button
3. Update the question and/or answer
4. Click "Save"

### Deleting an FAQ

1. Find the FAQ you want to remove
2. Click the "Delete" button
3. Confirm the deletion
4. **Warning**: This action is permanent!

### Managing FAQ Order

Like testimonials, FAQs are ordered by number:

- **Lower numbers appear first**
- Order 1 shows at the top of your FAQ section
- You can rearrange FAQs anytime by changing their order numbers

**Grouping Tips:**
- Group related questions together (e.g., all pricing questions in order 1-5)
- Put the most common questions first (orders 1-3)
- Save less common questions for later in the list

### Active/Inactive Status

- **Active** (green badge): FAQ is visible on your website
- **Inactive** (red badge): FAQ is hidden but saved

**When to use Inactive:**
- Seasonal questions (e.g., holiday-related FAQs)
- Questions being revised or updated
- Testing new FAQ content before publishing

### Writing Effective FAQs

**Question Writing:**
- Start with question words: "How do I...", "What is...", "When should..."
- Keep questions short and specific
- Use language your customers would use
- Example: "How long does shipping take?" instead of "Inquiry about delivery timeframes"

**Answer Writing:**
- Be clear and concise
- Break long answers into bullet points or numbered lists
- Include helpful links if relevant
- Anticipate follow-up questions
- Use a friendly, professional tone

**Example FAQ Entry:**

**Question:** "What payment methods do you accept?"

**Answer:**
"We accept the following payment methods:
- Credit cards (Visa, Mastercard, American Express)
- PayPal
- Bank transfer
- Apple Pay and Google Pay

All payments are processed securely through our encrypted payment gateway."

### Organizing Your FAQs

**Categories to Consider:**
1. General Information (Orders 1-5)
2. Pricing and Payments (Orders 6-10)
3. Services/Products (Orders 11-15)
4. Technical Support (Orders 16-20)
5. Company Policies (Orders 21-25)

---

## Best Practices

### Security

1. **Keep Credentials Secure**
   - Never share your admin login with unauthorized persons
   - Use a strong, unique password
   - Log out when finished, especially on shared computers

2. **Regular Backups**
   - The system automatically tracks changes
   - Version history is maintained for content edits

### Content Management

1. **Test Before Publishing**
   - Review changes in the editor before saving
   - Check how they look on the live site after publishing

2. **Consistency is Key**
   - Use consistent formatting across all pages
   - Maintain the same tone and style in your content

3. **SEO Considerations**
   - Always add alt text to images
   - Use proper heading hierarchy (H1 > H2 > H3)
   - Keep content updated and relevant

### Regular Maintenance

**Weekly Tasks:**
- Check analytics dashboard for traffic trends
- Review and respond to any new testimonials

**Monthly Tasks:**
- Update outdated content in the editor
- Add fresh testimonials if available
- Review and update FAQ section
- Check for broken images or links

**Quarterly Tasks:**
- Review all active testimonials for relevance
- Reorganize FAQ order based on customer inquiries
- Update company information and contact details

---

## Troubleshooting

### Can't Log In

**Problem:** Login page shows "Invalid credentials" or won't log in

**Solutions:**
1. Double-check your email and password (case-sensitive)
2. Clear your browser cache and cookies
3. Try a different browser
4. Contact your website administrator for password reset

### Session Expired

**Problem:** Redirected to login page while working

**Solution:** Your session lasts 7 days. Simply log in again to continue.

### Changes Not Appearing

**Problem:** Saved changes don't show on the website

**Solutions:**
1. Refresh your browser (press F5 or Ctrl+R / Cmd+R)
2. Clear browser cache
3. Try viewing in an incognito/private window
4. Check if content is set to "Active" status

### Image Upload Fails

**Problem:** Image won't upload or shows error

**Solutions:**
1. Check file format (use PNG, JPG, JPEG, GIF, or WebP)
2. Ensure image isn't too large (under 10MB recommended)
3. Check internet connection
4. Try a different image file

### Editor Not Loading

**Problem:** Rich text editor doesn't appear

**Solutions:**
1. Refresh the page
2. Clear browser cache
3. Disable browser extensions temporarily
4. Try a different browser (Chrome, Firefox, Safari recommended)

### Analytics Not Updating

**Problem:** Dashboard shows old data

**Solution:** The dashboard auto-refreshes every 30 seconds. Wait a moment, or manually refresh your browser.

### Delete Button Not Working

**Problem:** Can't delete testimonials or FAQs

**Solutions:**
1. Ensure you have proper admin permissions
2. Look for a confirmation dialog that may be hidden behind other windows
3. Refresh the page and try again

---

## Navigation Quick Reference

| Section | URL | What You Can Do |
|---------|-----|-----------------|
| **Login** | `/admin/login` | Log in to admin panel |
| **Dashboard** | `/admin` | View analytics and traffic stats |
| **Editor** | `/admin/editor` | Edit website content and images |
| **Testimonials** | `/admin/testimonials` | Manage customer testimonials |
| **FAQ** | `/admin/faq` | Manage frequently asked questions |

---

## Getting Help

If you encounter issues not covered in this guide:

1. **Technical Issues**: Contact your website developer
2. **Content Questions**: Refer to your brand guidelines or style guide
3. **Feature Requests**: Document what you need and discuss with your developer

---

## Additional Tips

### Time-Saving Shortcuts

- **Batch Updates**: Plan multiple updates and do them in one session
- **Content Calendar**: Schedule regular times to update testimonials and FAQs
- **Template Answers**: Keep a document with common FAQ answers you can copy/paste

### Mobile Access

The admin panel works on mobile devices, but for the best experience:
- Use a tablet or desktop computer for editing
- Mobile is great for quick checks of analytics
- Avoid uploading images from mobile (use desktop for better quality control)

### Analytics Insights

Use dashboard data to:
- Identify peak traffic times
- See which marketing efforts are working
- Plan content updates during high-traffic periods
- Track growth over time (compare 7-day vs 30-day vs 90-day trends)

---

## Version History

This admin panel includes built-in version tracking:
- All content changes are logged
- You can see who made changes and when
- Previous versions are preserved for reference

---

**Last Updated:** January 2025
**Admin Panel Version:** 1.0

---

Thank you for using the Savage Squad Content Management System! For additional support or questions, please contact your website developer.
