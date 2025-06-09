import requests

def test_file_upload():
    # Replace with an actual token from your localStorage
    token = "YOUR_TOKEN"
    url = "http://localhost:8000/notes/upload/"
    
    headers = {
        "Authorization": f"Bearer {token}"
    }
    
    # Test with a small text file
    with open('test.txt', 'rb') as f:
        files = {'file': f}
        response = requests.post(url, headers=headers, files=files)
        
        print("Status Code:", response.status_code)
        print("Response:", response.json())

if __name__ == "__main__":
    test_file_upload()