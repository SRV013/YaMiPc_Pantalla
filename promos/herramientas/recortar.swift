// Saca el fondo de la foto de un producto (usa el recorte de sujetos de macOS).
// Uso: swift promos/herramientas/recortar.swift <foto.jpg> <salida.png>
import Foundation
import Vision
import CoreImage
import ImageIO
import UniformTypeIdentifiers

let args = CommandLine.arguments
guard args.count == 3 else { print("Uso: recortar.swift <entrada> <salida.png>"); exit(1) }
let input = URL(fileURLWithPath: args[1])
let output = URL(fileURLWithPath: args[2])

guard let image = CIImage(contentsOf: input) else { print("No se pudo leer la imagen"); exit(1) }
let handler = VNImageRequestHandler(ciImage: image)
let request = VNGenerateForegroundInstanceMaskRequest()
try handler.perform([request])
guard let result = request.results?.first else { print("No se encontró el producto en la foto"); exit(1) }

// Todos los objetos detectados (por ejemplo consola + joystick) juntos.
let buffer = try result.generateMaskedImage(ofInstances: result.allInstances, from: handler, croppedToInstancesExtent: true)
let out = CIImage(cvPixelBuffer: buffer)
let ctx = CIContext()
guard let cg = ctx.createCGImage(out, from: out.extent),
      let dest = CGImageDestinationCreateWithURL(output as CFURL, UTType.png.identifier as CFString, 1, nil) else { exit(1) }
CGImageDestinationAddImage(dest, cg, nil)
CGImageDestinationFinalize(dest)
print("Listo: \(output.path) (\(cg.width)×\(cg.height))")
