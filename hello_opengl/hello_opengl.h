// hello_opengl.h : Include file for standard system include files,
// or project specific include files.

#pragma once

#include <iostream>
#include <stdio.h>
#include <stdlib.h>

#pragma comment(lib, "opengl32.lib")

// TODO: Reference additional headers your program requires here.

#pragma warning(push)
#pragma warning( disable: 6387 )
#pragma warning( disable: 6308 )
#pragma warning( disable: 26451 )
#pragma warning( disable: 6011 )
#pragma warning( disable: 28182 )
#pragma warning( disable: 6262 )
#define STB_IMAGE_IMPLEMENTATION
#include <stb_image.h>
#pragma warning(pop)

#include "camera.h"
#include "glad/glad.h"
#include "GLFW/glfw3.h"
#include "glm/glm.hpp"
#include "glm/gtc/matrix_transform.hpp"
#include "glm/gtc/type_ptr.hpp"