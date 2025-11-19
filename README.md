---

# 🌐 Lost & Found Web — Simple Reporting Application

A lightweight and responsive **Lost & Found reporting web application** built using **HTML, CSS, JavaScript**, and **LocalStorage**.
This project allows users to report lost or found items easily, complete with image upload, live camera capture, and a clean modern interface.

---

## 📌 Features

### 📝 Report Management

* Add new reports for lost or found items
* Input reporter information
* Enter location, date, and item description
* Automatic form validation

### 📸 Image Support

* Upload images from device storage
* Capture photos directly using device camera (mobile/laptop)
* Realtime image preview
* Delete/replace uploaded images

### 🔍 Search & Display

* Search items by name or location
* Display all reports with item details
* Photo preview for each report
* Status badge (lost / found)

### 💾 Local Data Storage

All reports are saved inside the browser using:

```
localStorage
```

This means the app works fully offline and does not require any backend server.

---

## 📂 Project Structure

```
lostfound_web/
│── index.html
│── tambah.html
│── style.css
│── script.js
│── /assets
│     ├── head/favicon.png
│     └── home/logo.png
```

---

## 🚀 How to Run the Project

1. Clone the repository:

```bash
git clone https://github.com/jidanofu06/lostfound_web.git
```

2. Enter the folder:

```bash
cd lostfound_web
```

3. Run in browser:

* Double-click `index.html`, **OR**
* Use VSCode Live Server

No installation or backend setup needed.

---

## 📸 Camera Integration

The application uses the browser's built-in camera API:

```js
navigator.mediaDevices.getUserMedia({ video: true })
```

This allows users to capture photos directly from their smartphone or laptop camera for faster reporting.

---

## 🌐 Deployment (GitHub Pages)

You can access the hosted website anytime through GitHub Pages.

To deploy it yourself:

1. Open **Settings** on your GitHub repository
2. Go to **Pages**
3. Under *Build and Deployment*:

   * Source: **Deploy from a branch**
   * Branch: `main`
   * Folder: `/root`
4. Save changes

Your site will appear at:

```
https://jidanofu06.github.io/lostfound_web/
```

---

## 👨‍💻 Author

**Zidan Ghifari**
Lost & Found Web Application — 2025

---
