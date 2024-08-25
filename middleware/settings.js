export default function({ $config, redirect }) {
  if ($config.underMaintenance.toString() == "true") {
    return redirect("/maintenance");
  }
}
