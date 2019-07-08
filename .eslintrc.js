/*module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
    }
};*/

module.export={
  "extends":["eslint:recommended"],
  "rules":{
    "no-console":["error",{
      "allow":["warn","error","info"]
    }]
  },
  "parser":"babel-eslint",
  "parserOptions":{
    "ecmaVersion":6,
    "sourceType":"script"
  },
  "globals":{//指定可以访问的全局变量
    //"window":true
  },
  "env":{//指定执行环境
    "browser":false,
    "node":true,
    "es6":true,
    "mocha":true
  }
};
