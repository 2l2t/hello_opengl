# CMakeList.txt : CMake project for hello_opengl, include source and define
# project specific logic here.
#
cmake_minimum_required (VERSION 3.8)
set(CMAKE_CXX_STANDARD 11)

# Add source to this project's executable.
add_executable (hello_opengl hello_opengl.cpp hello_opengl.h resources/shader.cpp resources/shader.hpp)

find_package(glfw3 CONFIG REQUIRED)
find_package(glad CONFIG REQUIRED)
find_package(glm CONFIG REQUIRED)

configure_file(resources/simpleshader.vert resources COPYONLY)
configure_file(resources/simpleshader.frag resources COPYONLY)

# TODO: Add tests and install targets if needed.
target_link_libraries(hello_opengl PRIVATE glad::glad)
target_link_libraries(hello_opengl PRIVATE glfw)
target_link_libraries(hello_opengl PRIVATE glm)