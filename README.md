# pcjr - the cjr package manager

# Installation
```git clone https://github.com/CJR-Org/pcjr```  
```cd pcjr```  
```sudo make install```

You can then remove the directory created by cloning.

# Usage
## Adding a package
### Installing specific package
`pcjr install <package_name> <version (optional)>`

Note: Installing a package automatically adds it to packages.json
Note: Not specifying a version will download the latest

### Installing all packages in packages.json
`pcjr install`


## Removing a package
`pcjr remove <package_name>`