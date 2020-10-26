# -*-coding:utf-8-*-
"""
@author_=LegalHigh"
@date: 2020/10/21 11:48
@email:tsz1216@sina.com
"""

import pymysql

# 打开数据库连接
conn = pymysql.connect(host='localhost', user='root', passwd='root', db='miniprogram')

# 使用cursor()方法创建一个游标对象cursor
cursor = conn.cursor()  # 游标对象用于执行查询和获取结果


# 使用execute()方法执行SQL查询
cursor.execute('SELECT VERSION()')

# 使用fetchone()方法获取单条数据
data = cursor.fetchone()

# 打印
print('database version: %s' % data)

# 关闭数据库连接
conn.close()

# 结果
# database version: 5.5.20