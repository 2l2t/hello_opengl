#version 330 core
out vec4 FragColor;

//keeping the TexCoord just to satisfy format and reuse vert
in vec2 TexCoord;

uniform vec3 objectColor;
uniform vec3 lightColor;

uniform sampler2D texture1;
uniform sampler2D texture2;

void main()
{
	FragColor = vec4(lightColor * objectColor, 1.0);	
}