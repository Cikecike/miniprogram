# -*-coding:utf-8-*-
"""
@author_    :   HP
@date       :   2020/10/25 20:04
@email      :   tsz1216@sina.com
@software   :   PyCharm
"""
import pymysql
from Decorator.Loger import log
from WX_API.get_openid import get_openid


@log
def Artic_Writer(conn=None,artic_args=None):
    """
    :param conn:  Mysql Connection of DataBase
    :param artic_args:  some params of article like title,content,summary....

    artic_args: {
        'author':,
        'artic_title':,
        'summary':,
        'content':,
        'cover_img_url':,
    }

    :return: True or Flase
    """
    selfBulidLink=False
    if artic_args==None:
        return
    # 打开数据库连接
    if conn==None:
        conn = pymysql.connect(host='localhost', user='root', passwd='root', db='miniprogram', cursorclass = pymysql.cursors.DictCursor)
        selfBulidLink=True
    # 使用cursor()方法创建一个游标对象cursor
    cursor = conn.cursor()  # 游标对象用于执行查询和获取结果
    # 使用execute()方法执行SQL查询

    openid=get_openid(code=artic_args['code'])

    sql1=''
    if artic_args['cover_img_url']!='':
        sql1="INSERT INTO article(author_id,artic_title,artic_summary,cover_img_url)VALUES('%s','%s','%s','%s')"%(openid,artic_args['artic_title'],artic_args['artic_summary'],artic_args['cover_img_url'])
    else:
        sql1 = "INSERT INTO article(author_id,artic_title,artic_summary)VALUES('%s','%s','%s')" % (openid, artic_args['artic_title'], artic_args['artic_summary'])

    print(sql1)
    cursor.execute(sql1)
    artic_key=conn.insert_id()
    print("conn.insert_id()", artic_key)
    # conn.commit()
    sql2="update artic_content set content='%s' where artic_key=%d"%(artic_args['content'],int(artic_key))
    print(sql2)
    cursor.execute(sql2)
    conn.commit()
    if selfBulidLink:
        conn.close()
# Artic_Writer(conn=None,artic_args={
#     'author':'Author_Testor',
#     'artic_title':'[测试]来自开发者的测试内容',
#     'artic_summary':'来自开发者的测试内容',
#     'content':'来自开发者的测试内容///testing',
#     'cover_img_url':'',
# })