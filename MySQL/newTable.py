# -*-coding:utf-8-*-
"""
@author_=LegalHigh"
@date: 2020/10/21 11:49
@email:tsz1216@sina.com
"""

import pymysql

# 打开数据库连接
conn = pymysql.connect(host='localhost', user='root', passwd='root', db='miniprogram')

# 使用cursor()方法创建一个游标对象cursor
cursor = conn.cursor()  # 游标对象用于执行查询和获取结果

# 使用execute()方法执行SQL，如果表存在则将其删除
cursor.execute('DROP TABLE IF EXISTS EMPLOYEE')

# 使用预处理语句创建表
sql = """
CREATE TABLE `employee` (
  `first_name` varchar(255) DEFAULT NULL COMMENT '姓',
  `last_name` varchar(255) DEFAULT NULL COMMENT '名',
  `age` int(11) DEFAULT NULL COMMENT '年龄',
  `sex` varchar(255) DEFAULT NULL COMMENT '性别',
  `income` varchar(255) DEFAULT NULL COMMENT '收入'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
"""

# 执行SQL语句
cursor.execute(sql)

# 关闭数据库连接
conn.close()