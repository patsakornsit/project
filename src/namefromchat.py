#%%
import csv
csv_file_path = "C:\\Users\\Acer\\Downloads\\for.csv"
search_keyword = "<beginner> B1 Python for Data Science, AI & Development B2 Computer Science: Programming with a Purpose free B3 Introduction to Computer Science and Programming specialization by University of London B4 IBM DevOps and Software Engineering <intermediate> I1 Java Programming and Software Engineering Fundamentals specialization by Duke University I2 C Programming with Linux specialization by Dartmouth College I3 Applied Software Engineering Fundamentals specialization by IBM I4 Data Engineering Foundations specialization by IBM <advance> A1 Build a Modern Computer from First Principles: From Nand to Tetris (Project-Centered Course) A2 Machine Learning Engineering for Production (MLOps) specialization by DeepLearning.AI A3 Computer Vision for Engineering and Science specialization by MathWorks A4 IBM AI Engineering"
def extract_Course_title_from_response(response):

    Course_title_keyword = ['B1', 'B2', 'B3',
                            'I1', 'I2', 'I3', 'A1', 'A2', 'A3']

    for i in range(len(Course_title_keyword) - 1):
        Course_title = Course_title_keyword[i]
        Next_course_title_keyword = Course_title_keyword[i + 1]

        begin_index = response.find(Course_title)
        end_index = response.find(Next_course_title_keyword)

        if begin_index != -1 and end_index != -1:
            List_of_course_title = response[begin_index +
                                            len(Course_title):end_index].strip()

    return List_of_course_title
def find_Data_that_gonna_show(csv_file, keyword):
    with open(csv_file, 'r', newline='', encoding='utf-8') as file:
        reader = csv.reader(file)
        headers = next(reader)
        occurrences = []
        for i, row in enumerate(reader, start=2):
            for j, value in enumerate(row):
                if keyword.lower() in value.lower():
                    occurrences.append((i, j))
        if occurrences:
            for position in occurrences:
                row_index, col_index = position
            return row_index-2
        else:
            print(f"Keyword '{keyword}' not found in any column.")
Keyword_that_gonna_show = find_Data_that_gonna_show(csv_file_path, search_keyword)
print(Keyword_that_gonna_show)
# def get_value_at_position(row_index, column_index):
#      with open(csv_file_path, 'r', newline='', encoding='utf-8') as file:
#         csv_reader = csv.reader(file)
#         next(csv_reader, None)
#         for _ in range(row_index):
#             next(csv_reader, None)
#         row = next(csv_reader, [])
#         if column_index < len(row):
#             return row[column_index]
#         else:
#             return None
# row_index = Keyword_that_gonna_show
# column_index = 3
# value = [get_value_at_position( row_index, column_index)]
# print(value)
# %%
