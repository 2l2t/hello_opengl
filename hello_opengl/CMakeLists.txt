# CMakeList.txt : CMake project for hello_opengl, include source and define
# project specific logic here.
#
cmake_minimum_required (VERSION 3.8)

# Add source to this project's executable.
add_executable (hello_opengl hello_opengl.cpp shader/shader.cpp shader/shader.hpp)

find_package(glfw3 CONFIG REQUIRED)
find_package(GLEW REQUIRED)
find_package(glm CONFIG REQUIRED)

# TODO: Add tests and install targets if needed.
target_link_libraries(hello_opengl PRIVATE GLEW::GLEW)
target_link_libraries(hello_opengl PRIVATE glfw)
target_link_libraries(hello_opengl PRIVATE glm)