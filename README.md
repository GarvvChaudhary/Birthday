# 🎂 Birthday Website - Quick Start Guide

## 🎉 Your Website is Ready!

This is a beautiful, interactive birthday website with:
- ✨ Elegant hero section with floating hearts
- 💝 Lovely romantic messages
- 📸 Photo gallery for your favorite memories
- 🎥 Video section for special moments
- 🎁 Interactive gift box that reveals a surprise photo
- 🎊 Confetti and celebration effects

## 📂 Project Structure

```
Birthday/
├── index.html          # Main website file
├── styles.css          # All the beautiful styling
├── script.js           # Interactive features
├── photos/             # Add your photos here
│   └── README.md       # Photo instructions
├── videos/             # Add your videos here
│   └── README.md       # Video instructions
└── README.md           # This file
```

## 🚀 How to View Your Website

### Option 1: Double-click
Simply double-click `index.html` to open it in your default browser.

### Option 2: Open with VS Code Live Server
1. Right-click on `index.html`
2. Select "Open with Live Server" (if you have the extension installed)

## 📸 Adding Your Photos

1. **Add photos to the `photos` folder**
2. **Edit `index.html`** - Find the gallery section (around line 80)
3. **Replace placeholder cards** with your images:

```html
<!-- Replace this placeholder -->
<div class="gallery-item">
    <div class="placeholder-card">
        <span class="placeholder-icon">📷</span>
        <p>Add your favorite photo here</p>
    </div>
</div>

<!-- With your actual image -->
<div class="gallery-item">
    <img src="photos/your-photo.jpg" alt="Beautiful Memory">
</div>
```

4. **Don't forget the surprise photo!**
   - Add a special photo named `surprise.jpg` in the photos folder
   - This reveals when the gift box is opened!

## 🎥 Adding Your Videos

1. **Add videos to the `videos` folder**
2. **Edit `index.html`** - Find the video section (around line 117)
3. **Replace placeholder cards** with your videos:

```html
<!-- Replace this placeholder -->
<div class="video-item">
    <div class="placeholder-card video-placeholder">
        <span class="placeholder-icon">🎥</span>
        <p>Add your special video here</p>
    </div>
</div>

<!-- With your actual video -->
<div class="video-item">
    <video controls>
        <source src="videos/your-video.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>
</div>
```

## ✏️ Customizing Messages

### Hero Section (Top of page)
Edit lines 20-23 in `index.html` to change the main title and message.

### Love Messages
Edit the message cards (lines 33-52) to write your own heartfelt messages.

### Reasons I Love You
Edit the reason cards (lines 135-176) to list your own special reasons.

### Final Message
Edit the final card (lines 216-220) for your closing birthday wishes.

## 🎁 How the Gift Box Works

The interactive gift box at the end of the website has:
1. **Two ribbons** (vertical and horizontal) - Click to remove each
2. **A bow** on top - Click to remove
3. **Surprise photo reveal** - After all 3 clicks, your special photo appears
4. **Birthday poppers** - Confetti explosion when the gift is opened!

Make sure you add `surprise.jpg` to the photos folder!

## 🎨 Color Customization

Want to change colors? Edit `styles.css` at the top (lines 9-15):

```css
:root {
    --primary-color: #ff6b9d;      /* Main pink */
    --secondary-color: #c44569;    /* Darker pink */
    --accent-color: #ffa4c8;       /* Light pink */
    --gold: #ffd700;               /* Gold for ribbons */
}
```

## 📱 Mobile Responsive

The website automatically adapts to:
- 📱 Mobile phones
- 📱 Tablets
- 💻 Laptops
- 🖥️ Desktop computers

## ✨ Special Features

- **Confetti Animation** - Plays on page load and when gift is opened
- **Floating Hearts** - Animated hearts in hero section and on scroll
- **Smooth Animations** - Elements fade in as you scroll
- **Interactive Elements** - Hover effects on all cards
- **Photo Modal** - Click photos to view them larger (if real photos are added)

## 🎯 Tips for Best Results

1. **Photos**: Use high-quality images (but under 2MB each)
2. **Videos**: Keep videos under 50MB for faster loading
3. **Messages**: Write from your heart - be genuine and specific
4. **Preview**: Test the website before showing it
5. **Surprise**: Add the special `surprise.jpg` photo for the gift box!

## 🐛 Troubleshooting

**Photos not showing?**
- Check the file path is correct (e.g., `photos/image.jpg`)
- Make sure photos are actually in the photos folder
- Check file names match exactly (case-sensitive)

**Videos not playing?**
- Use MP4 format for best compatibility
- Try a smaller file size
- Make sure the path is correct

**Gift box not revealing photo?**
- Make sure you added `surprise.jpg` to the photos folder
- Click all three parts: both ribbons and the bow

## 💝 Final Tips

- **Personalize Everything**: Change all the messages to your own words
- **Add Real Memories**: Replace all placeholders with actual photos and videos
- **Test Before Sharing**: Make sure everything works perfectly
- **Share with Love**: Send her the folder or host it online!

---

## 🌐 Want to Host Online?

You can share this website online using:
1. **GitHub Pages** (Free)
2. **Netlify** (Free)
3. **Vercel** (Free)

Just upload the entire Birthday folder to any of these services!

---

Made with ❤️ for someone special

Enjoy your birthday celebration! 🎉🎂
