# 📊 Absence Analysis Dashboard

Professional dashboard for analyzing teacher and paraprofessional absence patterns and fill rates for Lee County Annual ABR 2024-2025.

## 🚀 Live Demo

[View Dashboard](https://yourusername.github.io/absence-analysis-dashboard)

## ✨ Features

- **Interactive Charts**: Combined bar and line charts with hover tooltips
- **Comparative Analysis**: Teachers vs Paraprofessionals performance comparison
- **Key Metrics**: Overall fill rates, total absences, and critical statistics
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Print/Export**: Built-in functionality to print or export as PDF
- **Professional UI**: Clean, modern interface suitable for executive presentations

## 📈 Dashboard Components

### Main Chart
- **Blue bars**: Teacher absence totals by category
- **Green bars**: Paraprofessional absence totals by category
- **Red dashed line**: Teacher fill rate percentage
- **Green solid line**: Paraprofessional fill rate percentage

### Data Table
Complete breakdown showing:
- Teacher totals by absence reason
- Para totals by absence reason
- Fill rate percentages for both categories

### Key Insights
- Overall system performance metrics
- Critical statistics highlighting areas for improvement
- Visual indicators for quick decision-making

## 🛠️ Tech Stack

- **React 18**: Modern React with hooks
- **Recharts**: Professional charting library
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful, customizable icons

## 🚀 Quick Start

### Option 1: GitHub Pages (Recommended)

1. **Fork this repository**
2. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: `main`
   - Folder: `/` (root)
3. **Your dashboard will be live at**: `https://yourusername.github.io/absence-analysis-dashboard`

### Option 2: Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/absence-analysis-dashboard.git
cd absence-analysis-dashboard

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

### Option 3: Deploy to Vercel/Netlify

**Vercel:**
1. Connect your GitHub repo to [vercel.com](https://vercel.com)
2. Deploy automatically on every push

**Netlify:**
1. Connect your GitHub repo to [netlify.com](https://netlify.com)
2. Build command: `npm run build`
3. Publish directory: `build`

## 📊 Data Structure

The dashboard uses the following data structure:

```javascript
{
  teacherData: [
    {
      absenceReason: "VACANCY",
      unfilled: 1394,
      filled: 37597,
      total: 38991,
      fillRate: 96.4,
      category: "Teacher"
    },
    // ... more entries
  ],
  paraData: [
    // Similar structure for paraprofessionals
  ],
  summary: {
    totalAbsences: { teacher: 128281, para: 66300 },
    totalUnfilled: { teacher: 7545, para: 2401 },
    overallFillRate: { teacher: 94.1, para: 96.4 }
  }
}
```

## 🔧 Customization

### Update Data
1. Edit `src/App.js`
2. Modify the `dashboardData` object in the `useEffect` hook
3. Replace with your actual absence data

### Styling
- Colors and themes: Edit Tailwind classes in components
- Chart colors: Modify the `fill` and `stroke` properties in chart components
- Layout: Adjust grid and flex layouts as needed

### Add Features
- **Filters**: Add dropdown filters for date ranges or departments
- **Export**: Enhance export functionality with Excel/CSV options
- **Real-time Data**: Connect to APIs for live data updates

## 📱 Mobile Responsiveness

The dashboard is fully responsive and includes:
- Collapsible navigation on mobile
- Optimized chart sizing for small screens
- Touch-friendly interactive elements
- Print-optimized layouts

## 🖨️ Printing & Sharing

### Print to PDF
- Click the "Print/PDF" button
- Use browser's print dialog to save as PDF
- Optimized print styles included

### Share Link
- Click "Share Link" to copy dashboard URL
- Share with stakeholders via email, Slack, etc.
- Bookmark for quick access

## 📈 Key Insights

The dashboard reveals several important patterns:

1. **Paraprofessionals consistently outperform teachers** in fill rates across most absence categories
2. **VACANCY is the largest absence category** system-wide
3. **ILLNESS-SELF represents significant staffing challenge** requiring focused attention
4. **Fill rates vary significantly by absence type**, indicating opportunities for targeted improvements

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏢 About

Created for **Kelly Education** as part of the Lee County Annual ABR 2024-2025 analysis.

For questions or support, please open an issue in this repository.

---

**Built with ❤️ using React and modern web technologies**
