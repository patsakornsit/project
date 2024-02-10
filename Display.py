# %%
import csv
import numpy
import pandas as pd
import openai
from flask import Flask, request, jsonify
from flask_cors import CORS



openai.api_key = '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'
csv_file_path = "C:\\Users\\Acer\\Downloads\\for.csv"
Displayed_file_Path = "C:\\Users\\Acer\\Downloads\\displayed_data.csv"
List_of_course_title, all_row_position = [], []
Title, Rating, Reviews, Organization, Level, skill_outcome, Learning_period, link = 0, 1, 2, 3, 4, 5, 6, 7
# sending_file = pd.read_csv(csv_file_path)
# Analytics_File_to_prompt = ' '.join(
#     sending_file.apply(lambda x: ' '.join(x.astype(str)), axis=1))
# education_Field = "Com puter Science"
# system_prompt = "You are an expert about education in {}  you have experience of more over than a decade now you have information about online course I give before. Read all and if you understand only tell “ok” ".format(
#     education_Field)
# user_prompt = "From this file {}I want you to choose any amount course that you think it necessary for to become a {} but, it should much more than 3 from my information , for display in each level of {} obtain 3 level beginner,Intermediate,advance you can predict by your experience . The output should follow the exact same as format or pattern i will share below not anything else / <beginner> / B1 course title for  beginner level / B2 course title for  beginner level / B3 course title  for  beginner level / < intermediate > / I1 course title for  intermediate level / I2 course title for  intermediate level / I3 course title for  intermediate level / < advance > / A1 course title for advance level / A2 course title for advance level / A3 course title for advance level / if the course you suggest in each level beginner,Intermediate,advance must more than 3 keep continued format number to 4 5 6 7 8 9 ....".format(
#     Analytics_File_to_prompt, education_Field, education_Field)
# response = openai.ChatCompletion.create(
#     model="gpt-4-1106-preview",
#     messages=[{"role": "system", "content": system_prompt},
#               {"role": "user", "content": user_prompt}],
#     max_tokens=150,
#     temperature=1.0,
#     top_p=0.7,
#     n=1,
#     stream=False,
#     presence_penalty=0,
#     frequency_penalty=0,
#     stop=None
# )
# generated_text = response["choices"][0]["message"]["content"]
# print(generated_text)


#@app.route('/test', methods=['POST'])
#def handle_post_request():
    #data = request.json.get('categoryName')  # Access the data sent from React
    #print('Received data:', data)
    #return 'Received data successfully'  # Return a response (adjust as needed)




response = "<beginner> B1 Python for Data Science, AI & Development B2 Computer Science: Programming with a Purpose free B3 Introduction to Computer Science and Programming specialization by University of London B4 IBM DevOps and Software Engineering <intermediate> I1 Java Programming and Software Engineering Fundamentals specialization by Duke University I2 C Programming with Linux specialization by Dartmouth College I3 Applied Software Engineering Fundamentals specialization by IBM I4 Data Engineering Foundations specialization by IBM <advance> A1 Build a Modern Computer from First Principles: From Nand to Tetris (Project-Centered Course) A2 Machine Learning Engineering for Production (MLOps) specialization by DeepLearning.AI A3 Computer Vision for Engineering and Science specialization by MathWorks A4 IBM AI Engineering"


search_keyword = response.replace("<beginner>", "").replace(
    "<intermediate>", "").replace("<advance>", "")


def extract_Course_title_from_response(response):

    Course_title_keyword = ['B1', 'B2', 'B3','B4',
                            'I1', 'I2', 'I3','I4', 'A1', 'A2', 'A3','A4']

    for i in range(len(Course_title_keyword) - 1):
        Course_title = Course_title_keyword[i]
        Next_course_title_keyword = Course_title_keyword[i + 1] if i < len(
            Course_title_keyword) - 1 else ''

        begin_index = response.find(Course_title)
        end_index = response.find(Next_course_title_keyword)
        if begin_index != -1 and end_index != -1:
            List_of_course_title.append(response[begin_index +
                                                 len(Course_title):end_index].strip())
    last_course = Course_title_keyword[-1]
    last_index = response.find(last_course)
    if last_index != -1:
        List_of_course_title.append(
            response[last_index+len(last_course):].strip())
    return List_of_course_title


def find_Data_that_gonna_show(search_keywords):
    with open(csv_file_path, 'r', newline='', encoding='utf-8') as file:
        reader = csv.reader(file)

        headers = next(reader)
        occurrences = {keyword: [] for keyword in search_keywords}

        for i, row in enumerate(reader, start=2):
            for j, value in enumerate(row):
                for keyword in search_keywords:
                    if keyword.lower() in value.lower():
                        occurrences[keyword].append((i, j))

        for keyword, positions in occurrences.items():
            if positions:

                for position in positions:
                    row_index, col_index = position
                    all_row_position.append(row_index-1)

            else:
                print(f"Keyword '{keyword}' not found in any column.")
    return all_row_position


Keyword_that_gonna_show = find_Data_that_gonna_show(
    extract_Course_title_from_response(search_keyword))


def get_values_at_positions(column_index):
    result = []

    with open(Displayed_file_Path, 'r', newline='', encoding='utf-8') as file:
        csv_reader = csv.reader(file)

        next(csv_reader, None)

        for idx in Keyword_that_gonna_show:
            try:
                for _ in range(idx):
                    next(csv_reader)
            except StopIteration:
                result[idx] = None
                continue

            row = next(csv_reader, [])
            if column_index < len(row):
                result.append(row[column_index])
            else:
                result[idx] = None

    return result


def get_values_at_link(column_index):
    result = []

    with open(Displayed_file_Path, 'r', newline='', encoding='utf-8') as file:
        csv_reader = csv.reader(file)

        next(csv_reader, None)

        for idx in Keyword_that_gonna_show:
            try:
                for _ in range(idx):
                    next(csv_reader)
            except StopIteration:
                result[idx] = None
                continue

            row = next(csv_reader, [])
            if column_index < len(row):
                result.append("www.coursera.org"+row[column_index])
            else:
                result[idx] = None

    return result


Value_DataFrame = pd.DataFrame({
    "Course Title": get_values_at_positions(Title),
    "Rating": get_values_at_positions(Rating),
    "Reviews": get_values_at_positions(Reviews),
    "Organization": get_values_at_positions(Organization),
    "Level": get_values_at_positions(Level),
    "Skill Outcome": get_values_at_positions(skill_outcome),
    "Learning Period": get_values_at_positions(Learning_period),
    "Link": get_values_at_link(link)
})
app = Flask(__name__)
CORS(app) 
@app.route('/')
def hello():
    return "hello"


@app.route('/send-data', methods=['POST'])
def receive_data():
    if request.method == 'POST':
        received_data = request.json
        button_name = received_data.get('buttonName')  # Retrieve 'buttonName' from the received JSON data
        print('Received button name from JavaScript:', button_name)
        
        response = {'message': 'Data received successfully by Python', 'button_received': button_name}
        return jsonify(response)



@app.route('/get_data')
def get_data():
    df = Value_DataFrame
    json_data = df.to_json(orient='records')
    return jsonify({'data': json_data})



if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5008)
# %%
