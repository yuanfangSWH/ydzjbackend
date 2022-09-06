#!/bin/bash
rm -rf king.ddhi.cn && rm -rf king.ddhi.cn.zip  && npm run build:prod --report && zip -r king.ddhi.cn.zip king.ddhi.cn && zssh t1 up king.ddhi.cn.zip /www
