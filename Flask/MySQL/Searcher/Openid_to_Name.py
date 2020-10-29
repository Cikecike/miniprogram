# -*-coding:utf-8-*-
"""
@author_    :   HP
@date       :   2020/10/29 12:55
@email      :   tsz1216@sina.com
@software   :   PyCharm
"""
import pymysql
def Openid_to_Name(conn=None,openid=None):

    """

    :param conn:
    :param openid:
    :return:
    """

    if openid==None:
        return

    selfBulidLink = False
    # 打开数据库连接
    if conn == None:
        conn = pymysql.connect(host='localhost', user='root', passwd='root', db='miniprogram',
                               cursorclass=pymysql.cursors.DictCursor)
        selfBulidLink = True
    # 使用cursor()方法创建一个游标对象cursor
    cursor = conn.cursor()  # 游标对象用于执行查询和获取结果
    # 使用execute()方法执行SQL查询
    cursor.execute('SELECT nickname FROM user WHERE openid="%s";'%(openid))
    # 使用fetchone()方法获取单条数据
    data = cursor.fetchall()
    # print(data)

    # [print(i)for i in l]
    if selfBulidLink:
        conn.close()

    return data[0]['nickname']

# Openid_to_Name(openid='oiaSL5UoECnzDOOnMl_sUhHAZbqo')