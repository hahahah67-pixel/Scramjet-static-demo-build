# SCRAMJET - STATIC

### Build 1.5 (First Officialy Documentaied Release)
**Created & Maintained by:** hahahah67-pixel

---
align="center"><img src="https://raw.githubusercontent.com/hahahah67-pixel/scramjet-static-demo-build/main/transport/scramjett.png" height="200"></p>

## 🚀 About the Project

This is a static build of the **Scramjet** internet proxy, originally developed by **MercuryWorkshop**. This deployment is powered by a public WISP libcurl URL provided by **aura.pro**. 

This static variant is built on Scramjet version 1.10 and utilizes the core engine components directly from the official Scramjet Example-App, allowing it to remain entirely static.

---

## 🤝 Credits & Acknowledgments

* **MercuryWorkshop:** For creating the Scramjet proxy, supplying the essential engine files, and developing the WISP server and libcurl transport layers utilized by Scramjet.
* **Aura Team:** For hosting and providing the public WISP/libcurl server that `SJ-static` connects to, keeping this project serverless and static.

---

## File Structure

repo File structure
    
    -└── Scramjet-static-demo-build-main
    └── .github
        ├── ISSUE_TEMPLATE
        │   ├── bug_report.md
        │   ├── config.yml

        ├── workflows
        │   └── docker-image.yml
        │   └── eslint.yml
    └── bare-mux
        ├── bare-mux-worker.js
        ├── bare-mux.js
    └── scramjet-engine
        ├── scramjet-all.js
        ├── scramjet-sync.js
        ├── scramjet.js
        ├── scramjet.wasm
    └── transport
        ├── libcurl.mjs
        ├── scramjett.png
    └── index.html
    └── LICENSE
    └── README.md
    └── sw.js
    
    
## 📄 License & Legal

* **License:** This project and the open-source technologies it utilizes are licensed under the **AGPL 3.0 Public License**.
* **Inquiries:** For legal questions or copyright inquiries, please refer to dmca.com.

---

## ⭐ Support

Thank you for supporting this project! If you decide to fork it, please consider leaving a **Star (⭐)**!
