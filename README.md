PS C:\Users\admin\Desktop\ecommerce\backend> git status
On branch day3
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   controllers/authController.js
        modified:   controllers/index.js
        modified:   middlewares/authMiddleware.js
        modified:   middlewares/index.js
        modified:   models/User.js
        modified:   models/index.js
        modified:   routes/index.js
        modified:   services/authService.js
        modified:   services/index.js

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        controllers/productController.js
        middlewares/isAdmin.js
        models/Product.js
        routes/productRoutes.js
        services/productService.js

no changes added to commit (use "git add" and/or "git commit -a")
PS C:\Users\admin\Desktop\ecommerce\backend> git add .
PS C:\Users\admin\Desktop\ecommerce\backend> git status
On branch day3
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   controllers/authController.js
        modified:   controllers/index.js
        new file:   controllers/productController.js
        modified:   middlewares/authMiddleware.js
        modified:   middlewares/index.js
        new file:   middlewares/isAdmin.js
        new file:   models/Product.js
        modified:   models/User.js
        modified:   models/index.js
        modified:   routes/index.js
        new file:   routes/productRoutes.js
        modified:   services/authService.js
        modified:   services/index.js
        new file:   services/productService.js

PS C:\Users\admin\Desktop\ecommerce\backend> git commit -m "Day 3: Implemented product management features"
[day3 bb50346] Day 3: Implemented product management features
 14 files changed, 234 insertions(+), 16 deletions(-)
 create mode 100644 controllers/productController.js
 create mode 100644 middlewares/isAdmin.js
 create mode 100644 models/Product.js
 create mode 100644 routes/productRoutes.js
 create mode 100644 services/productService.js
PS C:\Users\admin\Desktop\ecommerce\backend> git push origin day3
Enumerating objects: 36, done.
Counting objects: 100% (36/36), done.
Delta compression using up to 12 threads
Compressing objects: 100% (21/21), done.
Writing objects: 100% (21/21), 3.71 KiB | 316.00 KiB/s, done.
Total 21 (delta 5), reused 0 (delta 0), pack-reused 0 (from 0)
remote: Resolving deltas: 100% (5/5), completed with 5 local objects.
remote:
remote: Create a pull request for 'day3' on GitHub by visiting:
remote:      https://github.com/GaneshPawar2004/amazon-backend-clone/pull/new/day3
remote:
To https://github.com/GaneshPawar2004/amazon-backend-clone.git
 * [new branch]      day3 -> day3
PS C:\Users\admin\Desktop\ecommerce\backend> git checkout main
Switched to branch 'main'
Your branch is up to date with 'origin/main'.
PS C:\Users\admin\Desktop\ecommerce\backend> git merge day3 
Updating e3cb79a..bb50346
Fast-forward
 controllers/authController.js    |  4 +--
 controllers/index.js             |  1 +
 controllers/productController.js | 70 ++++++++++++++++++++++++++++++++++++++++
 middlewares/authMiddleware.js    | 41 +++++++++++++++++------
 middlewares/index.js             |  1 +
 middlewares/isAdmin.js           |  7 ++++
 models/Product.js                | 20 ++++++++++++
 models/User.js                   |  4 +++
 models/index.js                  |  1 +
 routes/index.js                  |  2 ++
 routes/productRoutes.js          | 24 ++++++++++++++
 services/authService.js          | 22 ++++++++++---
 services/index.js                |  1 +
 services/productService.js       | 52 +++++++++++++++++++++++++++++
 14 files changed, 234 insertions(+), 16 deletions(-)
 create mode 100644 controllers/productController.js
 create mode 100644 middlewares/isAdmin.js
 create mode 100644 models/Product.js
 create mode 100644 routes/productRoutes.js
 create mode 100644 services/productService.js
PS C:\Users\admin\Desktop\ecommerce\backend> git push origin main
Total 0 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
To https://github.com/GaneshPawar2004/amazon-backend-clone.git
   e3cb79a..bb50346  main -> main
PS C:\Users\admin\Desktop\ecommerce\backend> 
