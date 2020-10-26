# -*-coding:utf-8-*-
"""
@author_    :   HP
@date       :   2020/10/21 12:49
@email      :   tsz1216@sina.com
@software   :   PyCharm
"""


import pymysql

# 打开数据库连接
conn = pymysql.connect(host='localhost', user='root', passwd='root', db='miniprogram')

# 使用cursor()方法创建一个游标对象cursor
cursor = conn.cursor()  # 游标对象用于执行查询和获取结果

sql = 'insert into employee(first_name,last_name,age,sex,income) values(%s,%s,%s,%s,%s);'
data = [
    ('july', 'Lex',15,"女",'15820'),
    ('june', 'Lex',17,"男",'7785'),
    ('marin', 'Lex',19,"男",'9983')
]
# 多条数据
# 拼接并执行sql语句
cursor.executemany(sql,data)

# 涉及写操作要注意提交
conn.commit()

# 关闭连接
cursor.close()
conn.close()