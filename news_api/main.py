import ollama
from fastapi import FastAPI
from newsapi import NewsApiClient
import os

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


@app.get("/get_news/{topic}")
async def get_news(
        topic: str
):
    with open('.env', 'r') as file:
        # Read the contents of the file
        contents = file.read()
        os.environ[contents.split("=")[0]] = contents.split("=")[1]
    newsapi = NewsApiClient(api_key=os.environ["API_KEY"])
    all_articles = newsapi.get_everything(q=topic,
                                          language='en',
                                          sort_by='relevancy',
                                          page=2)
    ai_response = ollama.chat(
        model="llama3.1",
        messages=[
            {
                'role': 'system',
                'content': f"These are the news for the topic {topic}. News: \n {all_articles}"
            },
            {
                'role': 'user',
                'content': 'Please generate me a sentiment score between 0 and 100. Your response must have only the '
                           'score. For example your response must be like this = 11'
            }
        ]
    )
    return {"message": ai_response['message']['content']}


app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"],
                   allow_credentials=True)

if __name__ == "__main__":
    import uvicorn
    from os import getenv

    host = getenv("HOST", "0.0.0.0")
    port = int(getenv("PORT", "8078"))  # Default port is 8080 if not specified
    uvicorn.run(app, host=host, port=port)