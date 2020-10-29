# -*-coding:utf-8-*-
"""
@author_    :   HP
@date       :   2020/10/29 12:45
@email      :   tsz1216@sina.com
@software   :   PyCharm
"""
import requests
import json
def get_openid(code):
    APPID = "wx9f143c9bd89988fe"
    SECRET = "e17354667524350d5b825a1977b85d11"
    URL = "https://api.weixin.qq.com/sns/jscode2session?appid=" + APPID + "&secret=" + SECRET + "&js_code=" + code + "&grant_type=authorization_code"
    re = requests.get(url=URL)
    # print(URL)
    # print(json.loads(str(re.text)))
    return json.loads(str(re.text))['openid']