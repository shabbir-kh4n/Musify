# 🎵 Musify - Music Player
# Auther - Shabbir Khan

A modern, responsive web-based music player built with HTML, CSS, and JavaScript. Musify allows you to browse and play music from your local music collection organized in folders.

## ✨ Features

- **🎼 Album/Artist Browsing**: Browse music organized by artists and albums
- **🎵 Music Playback**: Full audio controls with play, pause, next, previous
- **🔍 Search Functionality**: Search through your music library
- **📱 Responsive Design**: Works on desktop and mobile devices
- **🎚️ Volume Control**: Adjustable volume with mute toggle
- **⏱️ Progress Bar**: Visual progress indicator with seek functionality
- **🎨 Modern UI**: Clean, intuitive interface with smooth animations

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (like Live Server for VS Code)
- Music files organized in folders

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shabbir-kh4n/Musify.git
   cd Musify
   ```

2. **Set up your music structure**
   ```
   songs/
   ├── Artist Name/
   │   ├── cover.jpg
   │   ├── info.json
   │   ├── Song1.mp3
   │   ├── Song2.mp3
   │   └── ...
   ├── Another Artist/
   │   ├── cover.jpg
   │   ├── info.json
   │   └── ...
   ```

3. **Create info.json files**
   ```json
   {
     "title": "Album Title",
     "description": "Album description or year"
   }
   ```

4. **Start the server**
   - Use VS Code Live Server extension, or
   - Use any local web server like Python's `http.server` or Node.js `http-server`

## 📁 Project Structure

```
Musify/
├── css/
│   ├── style.css          # Main stylesheet
│   └── utility.css        # Utility classes
├── img/                   # Icons and images
│   ├── play.svg
│   ├── pause.svg
│   ├── next.svg
│   ├── previous.svg
│   ├── volume.svg
│   └── ...
├── js/
│   └── script.js          # Main JavaScript functionality
├── songs/                 # Your music collection
│   ├── Artist Name/
│   │   ├── cover.jpg
│   │   ├── info.json
│   │   └── *.mp3
│   └── ...
├── index.html             # Main HTML file
└── README.md              # This file
```

## 🎮 How to Use

### Basic Controls
- **Play/Pause**: Click the play button or click on any song
- **Next/Previous**: Use the navigation buttons
- **Volume**: Adjust with the slider or click the volume icon to mute
- **Seek**: Click on the progress bar to jump to a specific time

### Browsing Music
1. **View All Songs**: Click the logo to see all songs
2. **Browse by Artist**: Click on artist/album cards
3. **Search**: Use the search bar to find specific songs

### Music Organization
- Place your music in the `songs/` directory
- Each artist/album should have its own folder
- Include a `cover.jpg` for album artwork
- Add an `info.json` file with album metadata

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with flexbox and animations
- **JavaScript (ES6+)**: Async/await, modern DOM manipulation
- **Web Audio API**: Audio playback and controls

### Key Functions
- `getSongs(folder)`: Fetches songs from a specific folder
- `pusher()`: Displays songs in the playlist
- `playmus(index)`: Plays music at specified index
- `displayAlbum()`: Shows album/artist cards
- `allSongs()`: Loads all available songs

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🔧 Customization

### Adding New Features
- Modify `script.js` for new functionality
- Update `style.css` for visual changes
- Add new icons to the `img/` folder

### Styling
- Colors and themes can be modified in `css/style.css`
- Responsive breakpoints are defined for mobile optimization
- CSS variables are used for consistent theming

## 🐛 Troubleshooting

### Common Issues
1. **Songs not loading**: Check if your web server is running
2. **Audio not playing**: Ensure MP3 files are valid and accessible
3. **Images not showing**: Verify cover.jpg files exist in each folder
4. **Search not working**: Check browser console for JavaScript errors

### Debug Mode
Open browser console (F12) to see detailed logs and error messages.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



## 🙏 Acknowledgments

- Icons from various sources
- Music player inspiration from modern streaming services
- Community feedback and suggestions

## 📞 Support

If you have any questions or need help:
- Open an issue on GitHub
- Check the troubleshooting section above
- Review the code comments for implementation details

---

**Enjoy your music with Musify! 🎶**
