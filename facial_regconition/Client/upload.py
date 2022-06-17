from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive

gauth = GoogleAuth()
drive = GoogleDrive(gauth)

folder = '1jx69VcO8uSBKUslgzQAmVKMzNkYm9kl0'

upload_file_list = ['trainer.yml']
for upload_file in upload_file_list:
	gfile = drive.CreateFile({'parents': [{'id': folder}]})
	# Read file and set it as the content of this instance.
	gfile.SetContentFile(upload_file)
	gfile.Upload() # Upload the file.

print("\n [INFO] Successfully sent your facial recognition data to Server...")

