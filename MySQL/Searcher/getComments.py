# -*-coding:utf-8-*-
"""
@author_    :   HP
@date       :   2020/10/21 22:12
@email      :   tsz1216@sina.com
@software   :   PyCharm
"""
import pymysql
import json

from Decorator.Loger import log


@log
def getComments(conn=None,artic_key=None):
    selfBulidLink=False
    """
    :param conn: Mysql Connection of DataBase
    :param artic_key: provide artic_key to get Comments
    :return: 'comments': [
        {
          'Comment_key': "1234",
          'User_img_Url': "../../../icons/course.jpg",
          'Comer_id': "LESs_cola",
          "Comm_time": "2019-12-09",
          'Content_text': "来自开发者的测试testing六王毕，四海一；蜀山兀，阿房出。覆压三百余里，隔离天日。"
        },
        {
          'Comment_key': "1",
          'User_img_Url': "../../../icons/3.jpg",
          'Comer_id': "LESs_cola",
          "Comm_time": "2019-12-09",
          'Content_text': "来自开发者的测试testing2。"
        }
      ],
    """
    if artic_key==None:
        return
    # 打开数据库连接
    if conn==None:
        conn = pymysql.connect(host='localhost', user='root', passwd='root', db='miniprogram', cursorclass = pymysql.cursors.DictCursor)
        selfBulidLink=True
    # 使用cursor()方法创建一个游标对象cursor
    cursor = conn.cursor()  # 游标对象用于执行查询和获取结果
    # 使用execute()方法执行SQL查询
    cursor.execute("SELECT comments_key,user_img_url,author_id,comm_time,comment_text FROM comments WHERE artic_key=%d;"%(artic_key))
    # 使用fetchone()方法获取单条数据
    data = cursor.fetchall()
    # print('data: ', data)
    # 打印
    l=[]
    p={
        'Comment_key': None,
        'User_img_Url': None,
        'Comer_id': None,
        "Comm_time": None,
        'Comment_text': None
    }
    for d in data:
        # print(d)
        p['Comment_key']=d['comments_key']
        p['User_img_Url']=d['user_img_url']
        p['Comer_id']=d['author_id'],
        p['Comm_time']=str(d['comm_time'])
        p['Comment_text']=d['comment_text']

        """deep copy"""
        c=p.copy()
        # l.append(p)
        l.append(c)

    # 关闭数据库连接
    # [print(i)for i in l]
    if selfBulidLink:
        conn.close()

    return json.dumps(l)


# getComments(artic_key=1)