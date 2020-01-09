import os
import sys

import cairosvg

def print_usage(scriptname):
  print(f"Usage: {scriptname} <svg_filename>")
  print("Will take an svg file and generate a miriad of"
        " png files that can be used to create a PWA.")

def get_filename(argv):
  if len(argv) < 2 or argv[1].endswith("help"):
    print_usage(argv[0])
    sys.quit()
  return argv[1]

def get_size_formats():
  size_dict = {
    "android-chrome-{0}x{0}.png": [192, 512],
    "apple-touch-icon-{0}x{0}.png": [60, 76, 120, 152, 180],
    "apple-touch-icon.png": [180],
    "favicon-{0}x{0}.png": [16, 32],
    "msapplication-icon-144x144.png": [144],
    "mstile-150x150.png": [150],
  }
  for filename, sizes in size_dict.items():
    for size in sizes:
      yield filename.format(size), size

def change_filename(infile, outfile):
  return os.path.join(os.path.split(infile)[0], outfile)


def main():
  filename = get_filename(sys.argv)
  for outname, size in get_size_formats():
    save_name = change_filename(filename, outname)
    print(save_name)
    cairosvg.svg2png(url=filename, write_to=save_name,
             output_width=size, output_height=size)
main()
