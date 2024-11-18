import os
from starlette.config import Config


def get_file_upload_directory_path():
    config = Config(".env")
    file_upload_dir = config("FILE_UPLOAD_DIR", default="/var/www/llmHub/uploads/")
    if file_upload_dir:
        return file_upload_dir


# helper for saving file
def save_file_to_disk(file_path, file):
    try:
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        with open(file_path, "wb") as f:
            f.write(file.file.read())
            return file_path
    except Exception as e:
        print("There was problem with saving file", e)
        return None


def delete_file(file_path):
    try:
        os.remove(file_path)
        os.rmdir(os.path.dirname(file_path))
    except OSError as e:
        print("Error: %s - %s." % (e.filename, e.strerror))
