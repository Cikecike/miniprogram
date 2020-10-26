# -*-coding:utf-8-*-
"""
@author_    :   HP
@date       :   2020/10/21 19:28
@email      :   tsz1216@sina.com
@software   :   PyCharm
"""

import pymysql
import json
from Decorator.Loger import log


@log
def getArticle_List(conn=None):
    """
    :description:initalize homepage articleList
    :param conn:Mysql Connection of DataBase
    :return: Article:[
      {
        'Artic_key':"7788",
        'Artic_Title':"[本地测试内容]基于阿里云 Ubuntu 16.04.3 LTS 搭建 python+flask web 服务器",
        'Artic_summary':"[本地测试内容]1. 确认 Ubuntu 已正确安装 python 及 pip请参考《Linux Ubuntu 系统，python、pip 及virtualenv 安装》2. 通过 FileZilla 将 python+flask 工程部署于 Ubuntu 服务器3. 将工程中的启动文件 Application.py 中的 host 设置为 0.0.0.0",
      },
      ......
    ],
    """
    selfBulidLink = False
    # 打开数据库连接
    if conn == None:
        conn = pymysql.connect(host='localhost', user='root', passwd='root', db='miniprogram',
                               cursorclass=pymysql.cursors.DictCursor)
        selfBulidLink = True
    # 使用cursor()方法创建一个游标对象cursor
    cursor = conn.cursor()  # 游标对象用于执行查询和获取结果
    # 使用execute()方法执行SQL查询
    cursor.execute('SELECT artic_key,cover_img_url,artic_title,artic_summary FROM article;')
    # 使用fetchone()方法获取单条数据
    data = cursor.fetchall()
    # print('datab: ', data)
    # 打印
    l = []
    p = {
        'Artic_key': None,
        'Artic_Title': None,
        'Artic_summary': None,
        'Artic_cover_img_Url': None
    }
    for d in data:
        # print(d)
        p['Artic_key'] = d['artic_key']
        p['Artic_Title'] = d['artic_title']
        p['Artic_summary'] = d['artic_summary']
        p['Artic_cover_img_Url'] = d['cover_img_url']

        """deep copy"""
        c = p.copy()
        # l.append(p)
        l.append(c)

    # 关闭数据库连接
    # [print(i)for i in l]
    if selfBulidLink:
        conn.close()

    return json.dumps(l)

# getArticle_List()
