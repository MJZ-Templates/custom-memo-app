```
┌─────────────────────────────────────────────────────────┐
                 _              _               _
                | |            (_)             (_)
   __ _   _ __  | | __   __ _   _   _ __        _    ___
  / _` | | '__| | |/ /  / _` | | | | '_ \      | |  / _ \
 | (_| | | |    |   <  | (_| | | | | | | |  _  | | | (_) |
  \__,_| |_|    |_|\_\  \__,_| |_| |_| |_| (_) |_|  \___/


└─────────────────────────────────────────────────────────┘
```

### 📝 Custom Memo App Template Project
* A customizable memo application that allows users to create, organize, and manage memos in a visual and intuitive way.
* Memos can be categorized using color tags and displayed on a Kanban-style board for easy task management.
* Includes speech-to-text (STT) support, enabling users to quickly add memos by voice.

### 💻 Installation & Setup
1. Check URL and Port
   1. Move your mouse pointer over the [Preview] → [Running URL and Port] button in the menu bar and click the button.
   2. Check that the domains are registered on the 3000 and 8080 ports.
   3. If not, register the domain.

2. Environment variables and config settings
   1. Move to the `cd /workspace/custom-memo-app/front` directory and create a `.env` file.  
   2. Inside the file, add the following content:
   ```shell
   VITE_API_BASE_URL={server_base_url}
   ```
      1. for example
      ```
      VITE_API_BASE_URL=https://custom-memo-app-base-url.arkain.site
      ```
   3. add domain to the `vite.config.js` file
   ```javascript
   allowedHosts: [
      // ex) "custom-memo-front.ap-northeast-2.arkain.site"
      // add your own domain here
   ]
   ```
   
   4. add your front domain in CorsConfig in `back/src/.../back/config/web/CorsConfig.kt`
   ```java
   val configuration = CorsConfiguration().apply {
            allowedOrigins = listOf("http://localhost:3000", "http://localhost:5173")
            // add your front domain here
            // for example
            // allowedOrigins = listOf("http://localhost:3000", "http://localhost:5173", "https://custom-memo-front.ap-northeast-2.arkain.site")
            allowedMethods = listOf("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
            allowedHeaders = listOf("*")
            allowCredentials = true
        }
   ```

3. Check the database
```bash
service mysql start 
```
4. Check the secret key
   1. The `SECURITY_SECRET_KEY` is **automatically registered** in your `~/.bashrc` when the project is set up.
   2. If you want to **generate and apply a new secret key**, run the following command:
      ```bash
      sh set_key.sh && source ~/.bashrc
      ```
   3. This will:
      * Generate a new 640-character random secret key
      * Update the `SECURITY_SECRET_KEY` in your `~/.bashrc`
   4. Run `source ~/.bashrc` to apply the changes.
   5. **Note**: If `SECURITY_SECRET_KEY` is missing from you environment, the server will fail to start.
5. Run Project
   1. Click [Run Portfolio] button in the menu bar
   2. Alternatively, You can directly run the process.
   3. `cd /workspace/custom-memo-app/back` and use `pm2 start "./gradlew bootRun" --name memo-back`
   4. `cd /workspace/custom-memo-app/front` and use `pm2 start "npm run dev" --name memo-front`

### 📂 Folder Structure
client
```
front
├── node_modules
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── apis
│   │   ├── auth.js
│   │   ├── instance.js
│   │   ├── member.js
│   │   └── memo.js
│   ├── components
│   │   ├── Button.jsx
│   │   ├── KanbanBoard.jsx
│   │   ├── KanbanColumn.jsx
│   │   ├── MemoCard.jsx
│   │   ├── MemoList.jsx
│   │   ├── MemoModal.jsx
│   │   ├── STTButton.jsx
│   │   ├── SearchBar.jsx
│   │   └── index.js
│   ├── constants
│   │   └── memoColors.js
│   ├── index.css
│   ├── main.jsx
│   └── pages
│       ├── HomePage.jsx
│       ├── LoginPage.jsx
│       ├── MemoListPage.jsx
│       └── SignUpPage.jsx
├── .env
├── vite.config.js
├── eslint.config.js
├── index.html
├── package-lock.json
└── package.json
```

server
```
back
├── gradle
│   └── wrapper
└── src
    └── main
        ├── kotlin
        │   └── custom_memo
        │       └── dev
        │           └── back
        │               ├── auth
        │               │   ├── app
        │               │   │   ├── dto
        │               │   │   ├── filter
        │               │   │   └── provider
        │               │   ├── dao
        │               │   │   └── jpa
        │               │   │       └── entity
        │               │   ├── domain
        │               │   └── ui
        │               ├── common
        │               │   ├── dao
        │               │   ├── dto
        │               │   ├── exception
        │               │   └── web
        │               │       └── ui
        │               ├── config
        │               │   ├── dao
        │               │   ├── security
        │               │   │   └── annotation
        │               │   └── web
        │               │       └── resolver
        │               └── memo
        │                   ├── app
        │                   │   └── dto
        │                   ├── dao
        │                   │   └── jpa
        │                   │       └── entity
        │                   └── ui
        └── resources
```

### 🔧 Tip & Guide
1. **Get URL and Port**
   - You can get the default URL/Port and add URL/Port on the top right.
   - Move your mouse pointer over the [Preview] → [Running URL and Port] button in the menu bar (no click needed).

2. **Command feature**
   - You can simply run your script using the shortcut icons on the top right.
   - Move your mouse pointer over the [Run] → [Add run command] button in the menu bar (no click needed).

3. **SSH Configuration**
   - This feature is only available for membership users.
   - You can SSH to the Arkain container from the outside via the [Menu]->[SSH Configuration] in menu bar.

### 💬 Support & Documentation
Visit [https://arkain.io](https://arkain.io) to support and learn more about using Arkain.
To watch some usage guides, visit [https://docs.arkain.io](https://docs.arkain.io)
