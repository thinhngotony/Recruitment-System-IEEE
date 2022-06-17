import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
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