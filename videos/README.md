# 🎥 Videos Folder

## How to Add Your Videos

1. **Add your videos to this folder**
   - Recommended formats: .mp4, .webm, .ogg
   - MP4 format works best across all browsers

2. **Update the HTML file**
   
   Find the video section in `index.html` and replace the placeholder cards with your videos:

   **Replace this:**
   ```html
   <div class="video-item">
       <div class="placeholder-card video-placeholder">
           <span class="placeholder-icon">🎥</span>
           <p>Add your special video here</p>
       </div>
   </div>
   ```

   **With this:**
   ```html
   <div class="video-item">
       <video controls>
           <source src="videos/your-video-name.mp4" type="video/mp4">
           Your browser does not support the video tag.
       </video>
   </div>
   ```

## Example Video Names
- `our-story.mp4`
- `birthday-message.mp4`
- `special-moments.mp4`

## Tips
- Keep video file sizes reasonable (under 50MB) for better loading
- You can use online converters to compress videos if needed
- MP4 format provides the best compatibility
- The `controls` attribute allows play/pause/volume control

❤️ Create Beautiful Memories! ❤️
