import mysql.connector

mydb = mysql.connector.connect(
  host="192.168.1.165",
  user="root",
  password="root",
  database="server"
)

mycursor = mydb.cursor()

id = ("9999",)
print(id)
sql = "SELECT name FROM otp_authentication where otp = %s"
mycursor.execute(sql,id)
myresult = mycursor.fetchone()
print(myresult)