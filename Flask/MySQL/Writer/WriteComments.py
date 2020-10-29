# -*-coding:utf-8-*-
"""
@author_    :   HP
@date       :   2020/10/21 19:30
@email      :   tsz1216@sina.com
@software   :   PyCharm
"""
import pymysql
from Decorator.Loger import log
from WX_API.get_openid import get_openid


@log
def WriteComment(conn=None,artic_key=None,args=None):
    """
    :param args: {
        userinfo:{
            user_img_url:"https://xxxx.jpg",
            # nickname:"xxx"
            code:''
        }
        comment:"comments"
    }

    :param conn: Mysql Connection of DataBase
    :param artic_key: provide artic_key to write Comments
    :param commnets: contents of Comments
    :return: True or False
    """
    print(args)
    selfBulidLink=False
    if artic_key==None:
        return
    # 打开数据库连接
    if conn==None:
        conn = pymysql.connect(host='localhost', user='root', passwd='root', db='miniprogram', cursorclass = pymysql.cursors.DictCursor)
        selfBulidLink=True
    # 使用cursor()方法创建一个游标对象cursor



    cursor = conn.cursor()  # 游标对象用于执行查询和获取结果
    # 使用execute()方法执行SQL查询

    openid=get_openid(args['userInfo']['code'])

    sql="INSERT INTO comments(user_img_url,artic_key,author_id,comment_text)VALUES('%s',%d,'%s','%s');" % (args['userInfo']['user_img_url'],int(artic_key),openid,args['comment'])
    # print(sql)


    cursor.execute(sql)
    conn.commit()
    if selfBulidLink:
        conn.close()

# WriteComment(artic_key=1,args={
#     'userInfo': {
#         'user_img_url': "https://xxxx.jpg",
#         'nickname': "xxx"
#     },
#     'comment': "comments"
# })
